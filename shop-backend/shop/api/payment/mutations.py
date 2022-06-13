import graphene
from django.core.exceptions import ObjectDoesNotExist
from graphql_jwt.decorators import login_required
from ...order.models import Order
from ...payment.models import Payment
from ...payment.alipay.client import alipay_generate_payment_url
from .types import GetWayEnum
from ...payment import PaymentMethodType
from . import generate_out_trade_no
from django.db import transaction


class PayForOrder(graphene.Mutation):
    success = graphene.Boolean()
    url = graphene.String()
    getway = graphene.String()
    msg = graphene.String()

    class Arguments:
        token = graphene.String(required=True, description="订单的token。")
        getway = GetWayEnum(required=True, description="支付方式。")

    class Meta:
        description = "根据订单的token进行支付。"

    @classmethod
    @login_required
    @transaction.atomic
    def mutate(cls, root, info, token, getway):
        user = info.context.user
        try:
            order = Order.objects.select_related('payment').get(
                token=token, user=user, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("订单信息不存在或已删除。")
        payment, _ = Payment.objects.get_or_create(
            order=order,
            defaults={'out_trade_no': generate_out_trade_no()}
        )
        if payment.paid:
            return PayForOrder(success=False, msg="订单已经支付。")
        out_trade_no = payment.out_trade_no
        subject = "篮子商城"
        body = "干净又卫生啊兄弟们"
        total_amount = order.paid_price
        if getway == PaymentMethodType.ALIPAY:
            url = alipay_generate_payment_url(
                out_trade_no, subject, body, total_amount)
            return PayForOrder(success=True, url=url, getway=getway)
        return PayForOrder(success=False)
