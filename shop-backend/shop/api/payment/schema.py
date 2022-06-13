import graphene
from .mutations import PayForOrder


class PaymentMutations(graphene.ObjectType):
    PayForOrder = PayForOrder.Field()
