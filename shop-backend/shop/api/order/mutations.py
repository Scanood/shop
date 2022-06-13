import graphene
from .types import OrderInfo
from graphql_jwt.decorators import login_required, staff_member_required
from django.core.exceptions import ObjectDoesNotExist
from ...account.models import Address
from ...product.models import ProductVariants
from ...checkout.models import Checkout
from ...order.models import Order, OrderLine
import uuid
from django.db.models import F
from ..utils import calculate_discount_price
from django.db import transaction
from .types import OrderStatusType, OrderStatus
from . import (
    allow_staff,
    allow_user,
    allow_received,
    allow_shipped,
    allow_canceled,
    allow_fulfilled,
    allow_delete
)
from ...payment import PaymentMethodType
from ...payment.alipay.client import alipay_refund


class OrderInput(graphene.InputObjectType):
    address_id = graphene.ID(required=True, description="收货地址ID。")
    variants = graphene.List(
        graphene.String, required=True, description="要购买的商品的Slug。")
    note = graphene.String(description="备注。")


class OrderCreate(graphene.Mutation):
    success = graphene.Boolean()
    order = graphene.Field(
        OrderInfo,
        description="创建的订单信息。"
    )

    class Arguments:
        input = OrderInput(required=True, description="创建订单需要的信息。")

    class Meta:
        description = "创建订单。"

    @classmethod
    def validate_address(cls, root, user, input):
        address_id = input.get('address_id')
        try:
            address = Address.objects.get(pk=address_id, user=user)
        except ObjectDoesNotExist:
            raise ValueError("地址信息错误，请重新填写。")
        return address

    @classmethod
    def validate_variants(cls, root, user, input):
        variants = input.get('variants')
        if variants:
            items = []
            # 找到当前用户的购物车
            checkout, created = Checkout.objects.get_or_create(
                user=user)
            if created:
                raise ValueError("购物车为空。")
            # 找到当前用户购物车中的全部商品
            lines = checkout.lines.select_related('variant__product').all()
            # variants 要购买的商品的集合 slug
            for variant in variants:
                try:
                    # line :checkoutline的实例
                    line = lines.get(variant__slug=variant)
                except ObjectDoesNotExist:
                    raise ValueError("购物车中找不到商品条目信息。")
                except Exception:
                    raise ValueError("系统发生错误！")
                if not line.variant.product.published:
                    raise ValueError("商品未上架。")
                if line.quantity > line.variant.stock:
                    raise ValueError("商品库存不足。")
                items.append({
                    "line": line,
                    "quantity": line.quantity
                })
            return items, lines
        else:
            raise ValueError("商品条目不能为空。")

    @classmethod
    @login_required
    @transaction.atomic
    def mutate(cls, root, info, input):
        user = info.context.user
        address = cls.validate_address(root, user, input)
        variants, lines = cls.validate_variants(root, user, input)
        token = str(uuid.uuid4())
        order = Order.objects.create(
            user=user,
            address=address,
            note=input.get('note'),
            token=token
        )
        price = 0
        paid_price = 0
        for variant in variants:
            quantity = variant.get('quantity')
            variantInfo = variant.get('line').variant
            # 数据库层面的修改 修改库存信息
            ProductVariants.objects.filter(
                id=variantInfo.id).update(stock=F('stock')-quantity)
            real_price = calculate_discount_price(variantInfo)
            OrderLine.objects.create(
                order=order,
                variant=variantInfo,
                quantiy=quantity,
                price=variantInfo.price,
                real_price=real_price
            )
            # 进行订单价格的计算
            price = price + variantInfo.price*quantity
            paid_price = paid_price + real_price*quantity
            # 从购物车中删除加入订单的商品
            lines.filter(variant_id=variantInfo.id).delete()
        order.price = price
        order.paid_price = paid_price
        order.save()
        return OrderCreate(success=True, order=order)


class OrderUpdateStatus(graphene.Mutation):
    success = graphene.Boolean()
    msg = graphene.String()

    class Arguments:
        order = graphene.String(required=True, description="订单编号。")
        status = OrderStatusType(description="订单的状态。")

    class Meta:
        description = "修改订单的状态。"

    @classmethod
    def validate_status(cls, order, status, user):
        old_status = order.status
        # 订单只能本人签收
        if status == OrderStatusType.RECEIVED and order.user != user:
            raise PermissionError("当前订单不可以签收。")
        if status == OrderStatusType.CANCELED and old_status not in allow_canceled:
            raise PermissionError("当前订单不可以取消。")
        if status == OrderStatusType.FULFILLED and old_status not in allow_fulfilled:
            raise PermissionError("当前订单不可以付款。")
        if status == OrderStatusType.RECEIVED and old_status not in allow_received:
            raise PermissionError("当前订单不可以签收。")

    @classmethod
    def handle_cancel_refund(cls, order: Order, status):
        """取消订单后,若当前用户已支付则退款。"""
        try:
            if status == OrderStatusType.CANCELED and order.payment and order.payment.paid:
                if order.payment.method == PaymentMethodType.ALIPAY:
                    response = alipay_refund(order.payment.out_trade_no,
                                             order.payment.money, '取消订单')
                    if response.get('fund_change') == 'Y':
                        return OrderStatus.REFUND
        except ObjectDoesNotExist:
            pass
        return status

    @classmethod
    def handle_cancel_warehouse(cls, order: Order, status):
        """取消订单后，商品退回库存"""
        if status == OrderStatusType.CANCELED:
            lines = order.lines.all()
            for line in lines:
                line.variant.stock = line.variant.stock+line.quantiy
                line.variant.save()

    @classmethod
    def perform_user_update(cls, order: Order, status):
        cls.handle_cancel_warehouse(order, status)
        status = cls.handle_cancel_refund(order, status)
        Order.objects.filter(id=order.id).update(status=status)

    @classmethod
    def perform_staff_update(cls, order: Order, status, old_status):
        cls.handle_cancel_warehouse(order, status)
        if status == OrderStatusType.SHIPPED and old_status not in allow_shipped:
            raise PermissionError("当前订单不可以发货。")
        status = cls.handle_cancel_refund(order, status)
        staff_fulfill = False
        if status == OrderStatusType.FULFILLED:
            staff_fulfill = True
        Order.objects.filter(id=order.id).update(
            status=status, staff_fulfill=staff_fulfill)

    @classmethod
    @login_required
    @transaction.atomic
    def mutate(cls, root, info, order, status):
        user = info.context.user
        if not user.is_staff and status not in allow_user:
            raise PermissionError("您没有权限进行该操作。")
        if user.is_staff and status not in allow_staff:
            raise PermissionError("您没有权限进行该操作。")
        try:
            order = Order.objects.get(token=order, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("订单不存在。")
        cls.validate_status(order, status, user)
        old_status = order.status
        if user.is_staff:
            cls.perform_staff_update(order, status, old_status)
        else:
            if order.user != user:
                raise ValueError("订单编号错误。")
            cls.perform_user_update(order, status)
        return OrderUpdateStatus(success=True, msg="操作成功。")


class OrderDelete(graphene.Mutation):
    success = graphene.Boolean()
    msg = graphene.String()

    class Arguments:
        token = graphene.String(required=True, description="订单的编号。")

    class Meta:
        description = "删除订单。(只能删除自己的订单,管理员无权删除用户订单。)"

    @classmethod
    @login_required
    def mutate(cls, root, info, token):
        user = info.context.user
        try:
            order = Order.objects.get(user=user, is_delete=False, token=token)
        except ObjectDoesNotExist:
            raise ValueError("订单信息不存在或已删除。")
        if order.status not in allow_delete:
            raise PermissionError("当前订单不可以删除。")
        order.is_delete = True
        order.save()
        return OrderDelete(success=True, msg="订单删除成功。")


class OrderShippingUpdate(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        shipping = graphene.String(required=True, description="快递单号。")
        token = graphene.String(required=True, description="订单token。")

    class Meta:
        description = "管理员设置订单快递单号。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, shipping, token):
        try:
            order = Order.objects.get(token=token, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("订单信息不存在或已删除。")
        if(order.status != "shipped"):
            return OrderShippingUpdate(success=False)
        order.shipping = shipping
        order.save()
        return OrderShippingUpdate(success=True)
