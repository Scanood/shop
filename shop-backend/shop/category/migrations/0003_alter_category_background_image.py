# Generated by Django 3.2.4 on 2022-02-27 13:51

from django.db import migrations
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0002_auto_20220227_1959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='background_image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, null=True, upload_to='static/category-backgrounds'),
        ),
    ]
