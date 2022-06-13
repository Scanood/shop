import graphene
from .types import DiscountPaginator, DiscountInfo
from graphql_jwt.decorators import staff_member_required
from .resolvers import resolve_discounts, resolve_discount
from .mutations import(
    DiscountCreate,
    DiscountUpdate,
    DiscountDelete
)


class DiscountQueries(graphene.ObjectType):
    discounts = graphene.Field(
        DiscountPaginator,
        per_count=graphene.Int(required=True, description="每页展示的信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="查询所有的折扣信息。"
    )
    discount = graphene.Field(
        DiscountInfo,
        slug=graphene.String(required=True, description="折扣的Slug。"),
        description="根据Slug查询商品的折扣信息。"
    )

    @staff_member_required
    def resolve_discounts(self, info, per_count, number):
        return resolve_discounts(info, per_count, number)

    @staff_member_required
    def resolve_discount(self, info, slug):
        return resolve_discount(info, slug)


class DiscountMutations(graphene.ObjectType):
    DiscountCreate = DiscountCreate.Field()
    DiscountUpdate = DiscountUpdate.Field()
    DiscountDelete = DiscountDelete.Field()
