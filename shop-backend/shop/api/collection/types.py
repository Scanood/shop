import graphene
from ...product.models import Products
from graphene_django import DjangoObjectType
from ..basetype import BasePaginatorType


class CollectionProductsType(DjangoObjectType):
    class Meta:
        model = Products
        exclude = ('id','productVariants')


class CollectionPaginator(BasePaginatorType):
    products = graphene.List(CollectionProductsType, description="收藏的商品。")
