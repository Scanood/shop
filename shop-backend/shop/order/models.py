from django.db import models
from django.conf import settings
from ..account.models import Address
from django.utils import timezone
from ..order import OrderStatus
from ..product.models import ProductVariants
from django.core.validators import MinValueValidator
# Create your models here.


class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, related_name="order",
        on_delete=models.SET_NULL
    )
    address = models.ForeignKey(
        Address,
        null=True,
        related_name="+",
        on_delete=models.SET_NULL
    )
    date = models.DateTimeField(default=timezone.now)
    # 订单编号
    token = models.CharField(max_length=36, unique=True, blank=True)
    status = models.CharField(
        max_length=32, default=OrderStatus.UNFULFILLED, choices=OrderStatus.CHOICES
    )
    # 原价
    price = models.FloatField(null=True, blank=True)
    # 实际应支付价格
    paid_price = models.FloatField(default=0.0)
    note = models.TextField(null=True, blank=True, default="")
    # 是否为管理员设置完成付款
    staff_fulfill = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)

    # 快递单号
    shipping = models.CharField(
        max_length=256, null=True, blank=True, default=None)

    class Meta:
        ordering = ("-pk",)


class OrderLine(models.Model):
    order = models.ForeignKey(
        Order,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="lines"
    )
    variant = models.ForeignKey(
        ProductVariants,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )
    quantiy = models.PositiveIntegerField([MinValueValidator(1)])
    price = models.FloatField(default=0.0)
    real_price = models.FloatField(null=True, blank=True)

    class Meta:
        ordering = ("pk",)
