import graphene
from .types import CollectionPaginator
from graphql_jwt.decorators import login_required
from .resolvers import (
    resolve_collection_products,
    resolve_product_collected
)
from .mutations import AddCollection, CancelCollection


class CollectionQueries(graphene.ObjectType):
    collection_products = graphene.Field(
        CollectionPaginator,
        description="查询当前用户的收藏夹。",
        per_count=graphene.Int(required=True, description="每页展示的信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1)
    )
    product_collected = graphene.Boolean(
        description="当前用户是否收藏某商品。",
        slug=graphene.String(required=True, description="商品slug。")
    )

    @login_required
    def resolve_collection_products(self, info, per_count, number):
        return resolve_collection_products(info, per_count, number)

    @login_required
    def resolve_product_collected(self, info, slug):
        return resolve_product_collected(info, slug)


class CollectionMutations(graphene.ObjectType):
    AddCollection = AddCollection.Field()
    CancelCollection = CancelCollection.Field()
