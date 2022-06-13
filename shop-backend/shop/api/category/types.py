import graphene
from graphene_django import DjangoObjectType
from ...category.models import Category
from ..basetype import BasePaginatorType


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        exclude = ("category", "is_delete", "id")


class CategoriesInfo(BasePaginatorType):
    categories = graphene.List(CategoryType, description="商品类别。")
