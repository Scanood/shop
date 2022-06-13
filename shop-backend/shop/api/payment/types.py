import graphene
from graphene_django import DjangoObjectType
from ...payment import PaymentMethodType
from ...payment.models import Payment


class paymentInfo(DjangoObjectType):
    class Meta:
        model = Payment


class GetWayEnum(graphene.Enum):
    ALIPAY = PaymentMethodType.ALIPAY
    WEXINPAY = PaymentMethodType.WEXINPAY
