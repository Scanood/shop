import graphene
from django.core.exceptions import ObjectDoesNotExist
from graphql_jwt.decorators import login_required, staff_member_required
from .types import AddressInput, AddressType
from ...account.models import Address, User
from .forms import AddressForm
from ...settings import ACCOUNT_ADDRESSES_COUNT


class BaseAddressCreate(graphene.Mutation):
    address = graphene.Field(AddressType, description="创建的地址信息。")
    success = graphene.Boolean()

    @classmethod
    def save(cls, user, address: dict):
        address = Address.objects.create(
            first_name=address['first_name'],
            last_name=address['last_name'],
            province=address['province'],
            city=address['city'],
            street_address=address['street_address'],
            phone=address['phone'],
            user=user
        )
        address.save()
        return address

    @classmethod
    def valid_address(cls, address: dict):
        address_from = AddressForm(address)
        if not address_from.is_valid():
            raise ValueError("所填的地址信息不正确！")
        return address_from.cleaned_data

    @classmethod
    def mutate(cls, root, info, **data):
        pass


class BaseAddressDelete(graphene.Mutation):
    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, id):
        pass


class BaseAddressUpdate(graphene.Mutation):
    success = graphene.Boolean()

    @classmethod
    def save(cls, info, address, address_input: dict):
        address.first_name = address_input['first_name']
        address.last_name = address_input['last_name']
        address.province = address_input['province']
        address.city = address_input['city']
        address.street_address = address_input['street_address']
        address.phone = address_input['phone']
        address.save()
        return address

    @classmethod
    def valid_address(cls, address: dict):
        address_from = AddressForm(address)
        if not address_from.is_valid():
            raise ValueError("信息不正确！")
        return address_from.cleaned_data

    def mutate(cls, root, info, **data):
        pass


class AccountAddressCreate(BaseAddressCreate):
    class Arguments:
        input = AddressInput(
            description="详细地址信息", required=True
        )

    class Meta:
        description = "为用户创建一个新的地址。"

    @classmethod
    @login_required
    def mutate(cls, root, info, **data):
        user = info.context.user
        addresses_count = Address.objects.filter(
            is_delete=False, user=user).count()
        if addresses_count >= ACCOUNT_ADDRESSES_COUNT:
            raise ValueError("只能创建 %s 个地址信息！" % (ACCOUNT_ADDRESSES_COUNT))
        address = data.get("input")
        address = cls.valid_address(address)
        address = cls.save(user, address)
        return AccountAddressCreate(success=True, address=address)


class AccountAddressDelete(BaseAddressDelete):
    class Arguments:
        id = graphene.ID(required=True, description="要删除地址的ID。")

    class Meta:
        description = "根据指定ID逻辑删除当前用户的地址。"

    @classmethod
    @login_required
    def mutate(cls, root, info, id):
        user = info.context.user
        try:
            address = Address.objects.get(pk=id)
        except ObjectDoesNotExist:
            raise ValueError("地址不存在。")
        if address.user != user:
            raise PermissionError("无权限。")
        address.is_delete = True
        address.save()
        return AccountAddressDelete(success=True)


class AccountAddressUpdate(BaseAddressUpdate):
    class Arguments:
        id = graphene.ID(required=True, description="要修改的地址的ID。")
        input = AddressInput(
            required=True,
            description="新的地址信息。"
        )

    class Meta:
        description = "根据地址ID更新当前用户的地址信息。"

    @classmethod
    @login_required
    def mutate(cls, root, info, **data):
        user = info.context.user
        id = data.get("id")
        address_input = data.get("input")
        try:
            address = Address.objects.get(pk=id, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("地址信息不存在！")
        if address.user != user:
            raise PermissionError("无权限！")
        address_form = cls.valid_address(address_input)
        cls.save(info, address=address, address_input=address_form)
        return AccountAddressUpdate(success=True)


class AccountAddressSetDefault(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        id = graphene.ID(description="设置成默认地址的地址ID。", required=True)

    @classmethod
    @login_required
    def mutate(cls, root, info, id):
        user = info.context.user
        try:
            address = Address.objects.get(pk=id, is_delete=False, user=user)
        except ObjectDoesNotExist:
            raise ValueError("地址ID错误！")
        try:
            default_address = Address.objects.get(
                is_delete=False, user=user, is_default=True)
        except ObjectDoesNotExist:
            address.is_default = True
            address.save()
            return AccountAddressSetDefault(success=True)
        default_address.is_default = False
        address.is_default = True
        default_address.save()
        address.save()
        return AccountAddressSetDefault(success=True)


class StaffAddressCreate(BaseAddressCreate):
    class Arguments:
        input = AddressInput(
            description="详细地址信息。", required=True
        )
        email = graphene.String(required=True, description="用户的邮箱。")

    class Meta:
        description = "管理员为用户创建一个新的地址。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, **data):
        email = data.get('email')
        try:
            user = User.objects.get(email=email, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在！")
        addresses_count = Address.objects.filter(
            is_delete=False, user=user).count()
        if addresses_count >= ACCOUNT_ADDRESSES_COUNT:
            raise ValueError("只能创建 %s 个地址信息！" % (ACCOUNT_ADDRESSES_COUNT))
        address = data.get("input")
        address = cls.valid_address(address)
        address = cls.save(user, address)
        return StaffAddressCreate(address=address, user=user)


class StaffAddressDelete(BaseAddressDelete):
    class Arguments:
        id = graphene.ID(required=True, description="要删除地址的ID。")
        email = graphene.String(required=True, description="用户的邮箱。")

    class Meta:
        description = "管理员根据指定地址ID逻辑删除用户的地址。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, id, email):
        try:
            user = User.objects.get(email=email, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在！")
        try:
            address = Address.objects.get(pk=id, user=user)
        except ObjectDoesNotExist:
            raise ValueError("地址不存在。")
        address.is_delete = True
        address.save()
        return StaffAddressDelete(success=True)


class StaffAddressUpdate(BaseAddressUpdate):
    class Arguments:
        id = graphene.ID(required=True, description="要修改的地址的ID。")
        input = AddressInput(
            required=True,
            description="新的地址信息。"
        )
        email = graphene.String(required=True, description="要修改的用户的邮箱。")

    class Meta:
        description = "管理员根据地址ID更新用户的地址信息。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, **data):
        email = data.get('email')
        id = data.get("id")
        address_input = data.get("input")
        try:
            user = User.objects.get(email=email, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在！")
        try:
            address = Address.objects.get(pk=id, is_delete=False, user=user)
        except ObjectDoesNotExist:
            raise ValueError("地址信息不存在！")
        address_form = cls.valid_address(address_input)
        cls.save(info, address=address, address_input=address_form)
        return StaffAddressUpdate(success=True)


class StaffAddressSetDefault(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        id = graphene.ID(description="设置成默认地址的地址ID。", required=True)
        email = graphene.String(required=True, description="用户的邮箱。")

    class Meta:
        description = "管理员根据地址ID设置用户的默认地址。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, id, email):
        try:
            user = User.objects.get(email=email, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在！")
        try:
            address = Address.objects.get(pk=id, is_delete=False, user=user)
        except ObjectDoesNotExist:
            raise ValueError("地址ID错误！")
        try:
            default_address = Address.objects.get(
                is_delete=False, user=user, is_default=True)
        except ObjectDoesNotExist:
            address.is_default = True
            address.save()
            return StaffAddressSetDefault(success=True)
        default_address.is_default = False
        address.is_default = True
        default_address.save()
        address.save()
        return StaffAddressSetDefault(success=True)


class PassWordResetWithToken(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        token = graphene.String(required=True, description="用户的token。")
        newPassword = graphene.String(required=True, description='新密码。')

    class Meta:
        description = "管理员根据用户的token修改用户的密码。"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, token, newPassword):
        try:
            user = User.objects.get(token=token, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在。")
        user.set_password(newPassword)
        user.save()
        return PassWordResetWithToken(success=True)


class AccountDeleteWithToken(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        token = graphene.String(description="用户的token")

    class Meta:
        description = "管理员根据用户的token删除用户信息。（is_active=False）"

    @classmethod
    @staff_member_required
    def mutate(cls, root, info, token):
        try:
            user = User.objects.get(token=token, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在。")
        user.is_active = False
        user.save()
        return AccountDeleteWithToken(success=True)
