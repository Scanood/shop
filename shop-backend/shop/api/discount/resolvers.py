from ...discount.models import Discount
from ..utils import generate_paginator
from django.core.exceptions import ObjectDoesNotExist


def resolve_discounts(info, per_count, number):
    querySet = Discount.objects.filter(is_delete=False)
    return generate_paginator(querySet, per_count, number, 'discounts')


def resolve_discount(info, slug):
    try:
        discount = Discount.objects.get(is_delete=False, slug=slug)
    except ObjectDoesNotExist:
        raise ValueError("折扣信息不存在或已删除。")
    return discount
