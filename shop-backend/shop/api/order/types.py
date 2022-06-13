import graphene
from ...order.models import Order, OrderLine
from ..basetype import BasePaginatorType
from graphene_django import DjangoObjectType
from ...order import OrderStatus


class OrderInfo(DjangoObjectType):
    class Meta:
        model = Order
        exclude = ('id',)


class OrderLineInfo(DjangoObjectType):
    class Meta:
        model = OrderLine
        exclude = ('id', 'order')


class OrderPaginator(BasePaginatorType):
    orders = graphene.List(OrderInfo, description="当前页码的信息。")


class OrderStatusType(graphene.Enum):
    UNFULFILLED = OrderStatus.UNFULFILLED
    FULFILLED = OrderStatus.FULFILLED
    CANCELED = OrderStatus.CANCELED
    REFUND = OrderStatus.REFUND
    SHIPPED = OrderStatus.SHIPPED
    RECEIVED = OrderStatus.RECEIVED
