from django.db import models
from django.conf import settings
from ..product.models import ProductVariants
from django.core.validators import MinValueValidator
# Create your models here.


class Checkout(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        related_name="checkout",
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ('pk',)


class CheckoutLine(models.Model):
    checkout = models.ForeignKey(
        Checkout,
        null=False,
        blank=False,
        related_name="lines",
        on_delete=models.CASCADE
    )
    variant = models.ForeignKey(
        ProductVariants,
        blank=False,
        null=False,
        related_name="+",
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(
        validators=[MinValueValidator(1)], null=True, blank=True)

    class Meta:
        ordering = ('pk',)
