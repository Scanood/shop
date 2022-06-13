from unicodedata import name
from django.core.paginator import Paginator
from django.core.exceptions import ObjectDoesNotExist
from ...product.models import Products, ProductVariants
from ...category.models import Category
from ..utils import generate_paginator

# 检索已发布的商品信息


def resolve_products_published(per_count, number):
    products = Products.objects.filter(
        is_delete=False, published=True)
    p = Paginator(products, per_count)
    page = p.page(number)
    result = {
        "products": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_product_category_published(slug, per_count, number):
    try:
        category = Category.objects.get(
            slug=slug, is_delete=False)
    except ObjectDoesNotExist:
        raise ValueError(f"找不到slug为{slug}的商品类型。")
    products = Products.objects.filter(category=category, published=True)
    if category.children.filter(is_delete=False).count() > 0:
        for item in category.children.filter(is_delete=False):
            # or 操作 合并querySet
            products = products | Products.objects.filter(
                category=item, is_delete=False, published=True)
    p = Paginator(products, per_count)
    page = p.page(number)
    result = {
        "products": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_product_slug_published(slug):
    try:
        product = Products.objects.get(
            slug=slug, is_delete=False, published=True)
    except ObjectDoesNotExist:
        raise ValueError(f"找不到slug为{slug}的商品。")
    return product


# 检索所有的商品信息


def resolve_products(per_count, number, keyword):
    if keyword != "":
        products = Products.objects.filter(
            is_delete=False, name__icontains=keyword)
    else:
        products = Products.objects.filter(
            is_delete=False)
    p = Paginator(products, per_count)
    page = p.page(number)
    result = {
        "products": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_product_category(slug, per_count, number):
    try:
        category = Category.objects.get(
            slug=slug, is_delete=False)
    except ObjectDoesNotExist:
        raise ValueError(f"找不到slug为{slug}的商品类型。")
    products = Products.objects.filter(category=category)
    # 一级类型 涵盖所有二级类型商品
    if category.children.filter(is_delete=False).count() > 0:
        for item in category.children.filter(is_delete=False):
            # or 操作 合并querySet
            products = products | Products.objects.filter(
                category=item, is_delete=False)
    p = Paginator(products, per_count)
    page = p.page(number)
    result = {
        "products": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_product_slug(slug):
    try:
        product = Products.objects.get(
            slug=slug, is_delete=False)
    except ObjectDoesNotExist:
        raise ValueError(f"找不到slug为{slug}的商品。")
    return product

# 检索子条目信息


def resolve_productVariants(slug, per_count, number):
    try:
        product = Products.objects.get(
            slug=slug, is_delete=False)
    except ObjectDoesNotExist:
        raise ValueError(f"找不到slug为{slug}的商品。")
    p = Paginator(product.productVariants.filter(is_delete=False), per_count)
    page = p.page(number)
    result = {
        "productVariants": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_variant_slug(slug):
    try:
        variant = ProductVariants.objects.get(slug=slug, is_delete=False)
    except ObjectDoesNotExist:
        raise ValueError("商品子条目信息不存在或已删除。")
    return variant


def resolve_search_published_products(keyword, per_count, number):
    products = Products.objects.filter(name__icontains=keyword, published=True)
    return generate_paginator(products, per_count, number, 'products')
