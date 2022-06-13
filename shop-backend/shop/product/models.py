from django.db import models
from ..category.models import Category
from versatileimagefield.fields import VersatileImageField

# Create your models here.


class Products(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(allow_unicode=True, unique=True,
                            max_length=255, null=False, blank=False)
    description = models.TextField(max_length=500)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name="category", null=True)
    product_image = VersatileImageField(
        upload_to="static/product-images", blank=True, null=True)
    is_delete = models.BooleanField(default=False)
    published = models.BooleanField(default=False)

    class Meta:
        ordering = ("-pk",)

    def __str__(self) -> str:
        return self.name


class ProductVariants(models.Model):
    product = models.ForeignKey(
        Products, on_delete=models.SET_NULL, related_name="productVariants", null=True)
    name = models.CharField(max_length=255)
    slug = models.SlugField(allow_unicode=True, unique=True,
                            max_length=255, null=False, blank=False)
    price = models.FloatField(null=False, blank=False, default=0.0)
    stock = models.IntegerField(null=False, blank=False, default=0)
    description = models.TextField(max_length=500)
    productVariant_image = VersatileImageField(
        upload_to="static/productVariant", blank=True, null=True)
    is_delete = models.BooleanField(default=False)

    class Meta:
        ordering = ("pk",)

    def __str__(self) -> str:
        return self.name
