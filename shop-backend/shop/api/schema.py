import graphene
from graphql_auth.schema import MeQuery
from .account.schema import AuthMutations, AddressMutations, AddressQueries, UserQueries
from .category.schema import CategoryQueries, CategoryMutations
from .product.schema import ProductQueries, ProductMutations
from .checkout.schema import CheckoutQueries, CheckoutMutations
from .collection.schema import CollectionQueries, CollectionMutations
from .discount.schema import DiscountQueries, DiscountMutations
from .order.schema import OrderQueries, OrderMutations
from .payment.schema import PaymentMutations
from .sale.schema import SaleConditionsQueries

class Query(
    UserQueries,
    MeQuery,
    CheckoutQueries,
    ProductQueries,
    AddressQueries,
    CategoryQueries,
    CollectionQueries,
    DiscountQueries,
    OrderQueries,
    SaleConditionsQueries,
    graphene.ObjectType
):
    pass


class Mutation(
    AuthMutations,
    CheckoutMutations,
    ProductMutations,
    AddressMutations,
    CategoryMutations,
    CollectionMutations,
    DiscountMutations,
    OrderMutations,
    PaymentMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
