from django.core.paginator import Paginator
from ...checkout.models import Checkout


def resolve_checkout(info, per_count, number):
    user=info.context.user
    checkout, created = Checkout.objects.get_or_create(user=user)
    if created:
        checkout.user = user
        checkout.save()
    p = Paginator(checkout.lines.all(), per_count)
    page = p.page(number)
    result = {
        "lines": page.object_list,
        "count": p.count,
        "pages": p.num_pages,
        "has_previous": page.has_previous(),
        "has_next": page.has_next(),
        "number": number
    }
    return result
