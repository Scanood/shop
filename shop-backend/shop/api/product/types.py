import graphene
from graphene_django import DjangoObjectType
from ...product.models import Products, ProductVariants
from ..utils import calculate_discount_price


class ProductsType(DjangoObjectType):
    class Meta:
        model = Products
        exclude = ("productVariants",)


class ProductVariantsType(DjangoObjectType):
    discount_price = graphene.Float()

    class Meta:
        model = ProductVariants

    def resolve_discount_price(self, info):
        return calculate_discount_price(self)
