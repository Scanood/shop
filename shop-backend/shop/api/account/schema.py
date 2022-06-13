import graphene
from graphql_auth import mutations
from .mutations import (
    AccountAddressCreate,
    AccountAddressUpdate,
    AccountAddressDelete,
    AccountAddressSetDefault,
    StaffAddressCreate,
    StaffAddressDelete,
    StaffAddressUpdate,
    StaffAddressSetDefault,
    PassWordResetWithToken,
    AccountDeleteWithToken
)
from .types import AddressType, UserType
from graphql_jwt.decorators import login_required, staff_member_required
from ..basetype import BasePaginatorType
from .resolvers import (
    resolve_account_addresses,
    resolve_stuff_account_addresses,
    resolve_active_users,
    resolve_user)


class AddressesInfo(BasePaginatorType):
    addresses = graphene.List(AddressType, description="当前用户的所有地址信息。")

    class Meta:
        description = "分页后的地址及页码信息。"


class ActiveUsersInfo(BasePaginatorType):
    active_users = graphene.List(UserType, description="活跃状态的所有用户。")

    class Meta:
        description = "分页后的用户及页码信息。"


class AddressQueries(graphene.ObjectType):
    account_addresses = graphene.Field(
        AddressesInfo,
        per_count=graphene.Int(required=True, description="每页展示的地址信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        description="查询当前用户的所有地址信息。")

    stuff_account_addresses = graphene.Field(
        AddressesInfo,
        per_count=graphene.Int(required=True, description="每页展示的地址信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        email=graphene.String(required=True, description="用户的邮箱。"),
        description="管理员根据邮箱查询用户的地址信息。")

    @login_required
    def resolve_account_addresses(self, info, per_count, number):
        return resolve_account_addresses(info, per_count, number)

    @staff_member_required
    def resolve_stuff_account_addresses(self, info, per_count, number, email):
        return resolve_stuff_account_addresses(info, per_count, number, email)


class UserQueries(graphene.ObjectType):
    active_users = graphene.Field(
        ActiveUsersInfo,
        per_count=graphene.Int(required=True, description="每页展示的用户信息数量。"),
        number=graphene.Int(description="当前要查询的页码。", default_value=1),
        keyword = graphene.String(description="用户名查询用户。",default_value=""),
        description="活跃的账户信息。")
    user = graphene.Field(
        UserType,
        token=graphene.String(required=True, description="用户的token"),
        description="根据用户的token查询用户的信息。"
    )

    @staff_member_required
    def resolve_active_users(self, info, per_count, number,keyword):
        return resolve_active_users(per_count, number,keyword)

    def resolve_user(self, info, token):
        return resolve_user(info, token)


class AuthMutations(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_change = mutations.PasswordChange.Field()
    delete_account = mutations.DeleteAccount.Field()
    update_account = mutations.UpdateAccount.Field()
    # django-graphql-jwt inheritances
    token_auth = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    # refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()


class AddressMutations(graphene.ObjectType):
    # 普通用户
    AccountAddressCreate = AccountAddressCreate.Field()
    AccountAddressUpdate = AccountAddressUpdate.Field()
    AccountAddressDelete = AccountAddressDelete.Field()
    AccountAddressSetDefault = AccountAddressSetDefault.Field()

    # 管理员
    StaffAddressCreate = StaffAddressCreate.Field()
    StaffAddressDelete = StaffAddressDelete.Field()
    StaffAddressUpdate = StaffAddressUpdate.Field()
    StaffAddressSetDefault = StaffAddressSetDefault.Field()
    PassWordResetWithToken = PassWordResetWithToken.Field()
    AccountDeleteWithToken = AccountDeleteWithToken.Field()
