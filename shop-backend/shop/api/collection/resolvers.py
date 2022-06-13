from ...collection.models import Collection
from django.core.paginator import Paginator
from ...product.models import Products


def resolve_collection_products(info, per_count, number):
    user = info.context.user
    collection = Collection.objects.select_related('product').filter(user=user)
    products = []
    for item in collection:
        products = products + [item.product, ]
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


def resolve_product_collected(info, slug):
    user = info.context.user
    return Collection.objects.filter(user=user, product__slug=slug).exists()
