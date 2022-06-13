import graphene
from graphene_django import DjangoObjectType
from ...discount.models import Discount
from ..basetype import BasePaginatorType
from ...discount import DiscountValueType


class DiscountInfo(DjangoObjectType):
    class Meta:
        model = Discount
        exclude = ('id',)


class DiscountPaginator(BasePaginatorType):
    discounts = graphene.List(DiscountInfo, description="折扣信息。")


class DiscountValueTypeEnum(graphene.Enum):
    FIXED = DiscountValueType.FIXED
    PERCENTAGE = DiscountValueType.PERCENTAGE
