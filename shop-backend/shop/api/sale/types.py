import graphene


class OrderConditionStatusType(graphene.Enum):
    ALL = 'ALL'
    SHIPPING = 'SHIPPING'
    WAITPAY = 'WAITPAY'
    FINISH = 'FINISH'
    WAITSHIP='WAITSHIP'
    CANCEL='CANCEL'


class orderConditionType(graphene.ObjectType):
    status = graphene.Field(OrderConditionStatusType)
    count = graphene.Int()
