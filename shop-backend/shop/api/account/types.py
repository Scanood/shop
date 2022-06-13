import graphene
from graphene_django import DjangoObjectType
from ...account.models import User, Address


class UserType(DjangoObjectType):
    class Meta:
        model = User


class AddressType(DjangoObjectType):
    class Meta:
        model = Address


class AddressInput(graphene.InputObjectType):
    first_name = graphene.String(description="名。")
    last_name = graphene.String(description="姓。")
    province = graphene.String(description="省份。")
    city = graphene.String(description="市区。")
    street_address = graphene.String(description="具体地址/街道。")
    phone = graphene.String(description="电话号码。")
