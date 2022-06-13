import graphene
from .types import orderConditionType
from .resolvers import resolve_order_condition, resolve_user_count, resolve_purchase_count
from graphql_jwt.decorators import staff_member_required


class SaleConditionsQueries(graphene.ObjectType):
    order_condition = graphene.List(
        orderConditionType
    )
    user_count = graphene.Int()
    purchase_count = graphene.Float()

    @staff_member_required
    def resolve_order_condition(self, info):
        return resolve_order_condition()

    @staff_member_required
    def resolve_user_count(self, info):
        return resolve_user_count()

    @staff_member_required
    def resolve_purchase_count(self, info):
        return resolve_purchase_count()
