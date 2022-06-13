from django.db import models
from versatileimagefield.fields import VersatileImageField
# Create your models here.


class CategoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_delete=False)


class Category(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    slug = models.SlugField(max_length=255, unique=True,
                            allow_unicode=True, blank=False, null=False)
    description = models.CharField(max_length=255, blank=True, null=True)
    background_image = VersatileImageField(
        upload_to="static/category-backgrounds", blank=True, null=True)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children", on_delete=models.SET_NULL
    )
    is_delete = models.BooleanField(default=False)
    objects = CategoryManager()
    old_objects = models.Manager()  # The default manager.

    class Meta:
        ordering = ('-pk',)

    def __str__(self) -> str:
        return self.name
