from ...category.models import Category
from django.core.paginator import Paginator
from django.core.exceptions import ObjectDoesNotExist


def resolve_categories(per_count, number, tree):
    if tree:
        categories = Category.objects.filter(is_delete=False, parent=None)
    else:
        categories = Category.old_objects.filter(is_delete=False)
    p = Paginator(categories, per_count)
    page = p.page(number)
    result = {
        "categories": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result


def resolve_category(id, slug):
    if not id and not slug:
        raise ValueError("至少提供一个参数。")
    if id:
        try:
            category = Category.objects.get(pk=id, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("种类信息为空！")
        return category
    if slug:
        try:
            category = Category.objects.get(slug=slug, is_delete=False)
        except ObjectDoesNotExist:
            raise ValueError("种类信息为空！")
        return category
