import graphene
from .types import OrderPaginator, OrderInfo
from .resolvers import (
    resolve_orders,
    resolve_user_orders,
    resolve_staff_order_detail,
    resolve_user_order_detail
)
from graphql_jwt.decorators import login_required
from .mutations import(
    OrderCreate,
    OrderUpdateStatus,
    OrderDelete,
    OrderShippingUpdate
)


class OrderQueries(graphene.ObjectType):
    orders = graphene.Field(
        OrderPaginator,
        per_count=graphene.Int(required=True, description="每页展示的信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="管理员查询所有订单。"
    )
    user_orders = graphene.Field(
        OrderPaginator,
        per_count=graphene.Int(required=True, description="每页展示的信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        token=graphene.String(description="可选项，若传此参数，则返回该token用户的订单信息。"),
        description="查询当前用户的所有订单。"
    )
    order_detail = graphene.Field(
        OrderInfo,
        token=graphene.String(required=True, description="订单号"),
        description="根据订单号查询订单信息。"
    )

    @login_required
    def resolve_orders(self, info, per_count, number):
        return resolve_orders(info, per_count, number)

    @login_required
    def resolve_user_orders(self, info, per_count, number, token=None):
        return resolve_user_orders(info, per_count, number, token)

    @login_required
    def resolve_order_detail(self, info, token):
        user = info.context.user
        if user.is_staff:
            return resolve_staff_order_detail(token)
        else:
            return resolve_user_order_detail(user, token)


class OrderMutations(graphene.ObjectType):
    OrderCreate = OrderCreate.Field()
    OrderUpdateStatus = OrderUpdateStatus.Field()
    OrderDelete = OrderDelete.Field()
    OrderShippingUpdate = OrderShippingUpdate.Field()
