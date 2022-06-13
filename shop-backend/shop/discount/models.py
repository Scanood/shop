from django.db import models
from ..category.models import Category
from ..product.models import Products
from shop.discount import DiscountValueType
from django.utils import timezone
from django.db.models import Q
# Create your models here.


class DiscountManager(models.Manager):
    """所有在有效期内的优惠"""

    def active(self):
        date = timezone.now()
        return self.filter(
            Q(end_date__isnull=True) | Q(end_date__gte=date), start_date__lte=date
        )


class Discount(models.Model):
    """面向所有用户的商品优惠"""
    name = models.CharField(max_length=255, null=False, blank=False)
    slug = models.CharField(max_length=255, null=False, blank=False)
    type = models.CharField(
        max_length=10,
        choices=DiscountValueType.CHOICES,
        default=DiscountValueType.FIXED
    )
    value = models.FloatField(default=0)
    categories = models.ManyToManyField(Category, blank=True)
    products = models.ManyToManyField(Products, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    is_delete = models.BooleanField(default=False)
    objects = DiscountManager()

    def __str__(self) -> str:
        return self.name
