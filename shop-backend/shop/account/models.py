import uuid
from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(blank=False, unique=True)
    token = models.CharField(max_length=256, unique=True, default=uuid.uuid4,
                             blank=True)
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

    class Meta:
        ordering = ("pk",)


class Address(models.Model):
    first_name = models.CharField(max_length=256, blank=True)
    last_name = models.CharField(max_length=256, blank=True)
    province = models.CharField(max_length=256, blank=True)
    city = models.CharField(max_length=256, blank=True)
    street_address = models.CharField(max_length=256, blank=True)
    phone = models.CharField(max_length=20, blank=True, default="")
    is_delete = models.BooleanField(default=False)
    is_default = models.BooleanField(default=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name="addresses")

    class Meta:
        ordering = ("pk",)

    @property
    def full_name(self):
        return "%s %s" % (self.first_name, self.last_name)

    @property
    def full_address(self):
        return "%s %s %s" % (self.province, self.city, self.street_address)
