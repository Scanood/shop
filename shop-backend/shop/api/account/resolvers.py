from django.core.paginator import Paginator
from ...account.models import Address, User
from django.core.exceptions import ObjectDoesNotExist


def account_addresses(per_count, number, user):
    addresses = Address.objects.filter(is_delete=False, user=user)
    p = Paginator(addresses, per_count)
    page = p.page(number)
    result = {
        "addresses": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_account_addresses(info, per_count, number):
    user = info.context.user
    return account_addresses(per_count, number, user)


def resolve_stuff_account_addresses(info, per_count, number, email):
    try:
        user = User.objects.get(email=email, is_active=True)
    except ObjectDoesNotExist:
        raise ValueError("用户不存在！")
    return account_addresses(per_count, number, user)


def resolve_active_users(per_count, number, keyword):
    if keyword != "":
        active_users = User.objects.filter(
            is_active=True, is_staff=False, username__icontains=keyword)
    else:
        active_users = User.objects.filter(is_active=True, is_staff=False)
    p = Paginator(active_users, per_count)
    page = p.page(number)
    result = {
        "active_users": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_user(info, token):
    user = info.context.user
    if user.is_staff:
        try:
            res = User.objects.get(token=token, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在。")
        return res
    if user.token == token:
        return user
    else:
        raise ValueError("您没有权限查看该用户。")
        return None
