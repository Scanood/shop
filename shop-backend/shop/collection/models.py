from django.db import models
from django.conf import settings
from ..product.models import Products
# Create your models here.


class Collection(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="collection"
    )
    product = models.ForeignKey(
        Products,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="+"
    )

    def __str__(self) -> str:
        return self.product
