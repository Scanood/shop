from ...order.models import Order
from .types import OrderConditionStatusType
from django.db.models import Q, Sum
from ...account.models import User


def resolve_order_condition():
    collection = []
    all_number = Order.objects.filter(is_delete=False).count()
    collection.append({
        "status": OrderConditionStatusType.ALL,
        "count": all_number})
    waitship_number = Order.objects.filter(
        status='fulfilled', is_delete=False).count()
    collection.append({
        "status": OrderConditionStatusType.WAITSHIP,
        "count": waitship_number
    })
    shipping_number = Order.objects.filter(
        status='shipping', is_delete=False).count()
    collection.append({
        "status": OrderConditionStatusType.SHIPPING,
        "count": shipping_number
    })
    waitpay_number = Order.objects.filter(
        status='unfulfilled', is_delete=False).count()
    collection.append({
        "status": OrderConditionStatusType.WAITPAY,
        "count": waitpay_number
    })
    finish_number = Order.objects.filter(
        status='received', is_delete=False).count()
    collection.append({
        "status": OrderConditionStatusType.FINISH,
        "count": finish_number
    })
    cancel_number = Order.objects.filter(
        Q(status='canceled') | Q(status="refund"), is_delete=False).count()
    collection.append({
        "status": OrderConditionStatusType.CANCEL,
        "count": cancel_number
    })

    return collection


def resolve_user_count():
    return User.objects.filter(is_staff=False, is_active=True).count()


def resolve_purchase_count():
    count = Order.objects.filter(
        status='received').aggregate(sum=Sum('paid_price'))
    return count['sum'] or 0
