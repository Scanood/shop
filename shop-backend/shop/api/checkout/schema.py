import graphene
from .types import CheckoutInfo
from graphql_jwt.decorators import login_required
from .resolvers import resolve_checkout
from .mutations import(
    AddVariantToCheckout,
    DeleteVariantInCheckout,
    UpdateVariantInCheckout,
    ClearCheckout
)


class CheckoutQueries(graphene.ObjectType):
    checkout = graphene.Field(
        CheckoutInfo,
        per_count=graphene.Int(required=True, description="每页展示的信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="购物车。")

    @login_required
    def resolve_checkout(self, info, per_count, number):
        return resolve_checkout(info, per_count, number)


class CheckoutMutations(graphene.ObjectType):
    AddVariantToCheckout = AddVariantToCheckout.Field()
    DeleteVariantInCheckout = DeleteVariantInCheckout.Field()
    UpdateVariantInCheckout = UpdateVariantInCheckout.Field()
    ClearCheckout = ClearCheckout.Field()
