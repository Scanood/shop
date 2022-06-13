import graphene
from .types import CategoriesInfo, CategoryType
from .resolvers import (
    resolve_categories, resolve_category
)
from .mutations import (
    CategoryCreate,
    CategoryDelete,
    CategoryUpdate,

)


class CategoryQueries(graphene.ObjectType):
    categories = graphene.Field(
        CategoriesInfo,
        per_count=graphene.Int(required=True, description="每页展示的种类信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        tree=graphene.Boolean(description="是否树形展示", default_value=True),
        description="查询所有的商品种类（树形结构）。"
    )
    category = graphene.Field(
        CategoryType,
        id=graphene.Argument(graphene.ID, description="种类的ID。"),
        slug=graphene.Argument(graphene.String, description="种类的Slug。"),
        description="根据ID或者Slug查询种类信息。"
    )

    def resolve_categories(self, info, per_count, number,tree):
        return resolve_categories(per_count, number,tree)

    def resolve_category(self, info, id=None, slug=None):
        return resolve_category(id, slug)


class CategoryMutations(graphene.ObjectType):
    categoryCreate = CategoryCreate.Field()
    categoryDelete = CategoryDelete.Field()
    categoryUpdate = CategoryUpdate.Field()
