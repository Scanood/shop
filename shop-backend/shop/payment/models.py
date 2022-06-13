from django.db import models
# Create your models here.
from ..payment import PaymentMethodType
from ..order.models import Order


class Payment(models.Model):
    # 支付方式
    method = models.CharField(
        max_length=32, choices=PaymentMethodType.CHOICES, null=True, blank=True)
    # 订单号
    out_trade_no = models.CharField(
        max_length=64, null=False, blank=False, unique=True)
    # 交易号
    trade_no = models.CharField(max_length=64, blank=True, null=True)
    # 是否完成支付
    paid = models.BooleanField(default=False)
    money = models.FloatField(null=True, blank=True, default=0.0)
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True, related_name='payment')
