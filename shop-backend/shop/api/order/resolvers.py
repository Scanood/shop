from ...order.models import Order
from ..utils import generate_paginator
from django.core.exceptions import ObjectDoesNotExist
from ...account.models import User


def resolve_orders(info, per_count, number):
    querySet = Order.objects.filter(is_delete=False)
    return generate_paginator(querySet, per_count, number, 'orders')


def resolve_user_orders(info, per_count, number, token):
    user = info.context.user
    if user.is_staff:
        try:
            user = User.objects.get(token=token, is_active=True)
        except ObjectDoesNotExist:
            raise ValueError("用户不存在！")
    querySet = Order.objects.filter(is_delete=False, user=user)
    return generate_paginator(querySet, per_count, number, 'orders')


def resolve_staff_order_detail(token):
    try:
        order = Order.objects.get(token=token, is_delete=False)
    except ObjectDoesNotExist:
        raise ValueError('订单信息不存在或已删除。')
    return order


def resolve_user_order_detail(user, token):
    try:
        order = Order.objects.get(token=token, is_delete=False, user=user)
    except ObjectDoesNotExist:
        raise ValueError('订单信息不存在或已删除。')
    return order
