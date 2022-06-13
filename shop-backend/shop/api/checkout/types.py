import graphene
from ...checkout.models import CheckoutLine
from ..basetype import BasePaginatorType
from graphene_django import DjangoObjectType
class ChekcoutLineType(DjangoObjectType):
    class Meta:
        model = CheckoutLine


class CheckoutInfo(BasePaginatorType):
    lines = graphene.List(ChekcoutLineType,description="购物车信息。")    