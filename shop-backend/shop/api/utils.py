import os
import secrets
from slugify import slugify
from django.core.paginator import Paginator
from django.db.models import Q
from ..discount.models import Discount, DiscountValueType


def valid_upload_image(file):
    """检验图片格式"""
    allowed_extensions = [".jpg", ".jpeg", ".png"]
    if not file:
        raise ValueError("图片上传失败！")
    if not file.content_type.startswith("image/"):
        raise ValueError("无效的文件类型！")
    file_name, format = os.path.splitext(file._name)
    if not format:
        raise ValueError("图片后缀名为空！")
    if format not in allowed_extensions:
        raise ValueError("图片类型不支持！")
    return True


def add_hash_to_file_name(file):
    """重写文件名"""
    file_name, format = os.path.splitext(file._name)
    hash = secrets.token_hex(nbytes=4)
    new_name = f"{file_name}_{hash}{format}"
    file._name = new_name


def generate_unique_slug(ModelClass, field, field_name):
    """生成唯一的slug"""
    slug = slugify(field, to_lower=True, allow_unicode=True, max_length=20)
    extension = 1
    query = field_name+"__startswith"
    slug_values = ModelClass._default_manager.filter(**{query: slug})

    for _ in slug_values:
        extension += 1
    return f"{slug}-{extension}"


def generate_paginator(querySet, per_count, number, filed):
    """
    querySet:需要进行分页的querySet
    per_count:每页含有的信息的数量
    number:当前的页码
    filed:返回结果的字段名称
    """
    p = Paginator(querySet, per_count)
    page = p.page(number)
    result = {
        filed: page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def validate_end_is_after_start(start_date, end_date):
    """
    校验终止时间不能早于起始时间
    """
    if end_date is None:
        return

    if start_date > end_date:
        raise ValueError("到期时间不能早于开始时间。")


def calculate_discount_price(variant):
    """
        单个商品可享受多个优惠活动叠加
        若优惠后的价格小于等于0,则商品价格调整为0.01
    """
    product = variant.product
    category = product.category
    if product.is_delete:
        raise ValueError("当前商品已删除。")
    price = variant.price
    discounts = Discount.objects.active().filter(
        Q(products=product) | Q(categories=category), is_delete=False).distinct()
    for discount in discounts:
        if discount.type == DiscountValueType.FIXED:
            price = round(price-discount.value, 2)
        elif discount.type == DiscountValueType.PERCENTAGE:
            price = round(price*(1-discount.value*0.01), 2)
        if price <= 0:
            price = 0.01
            break
    return price
