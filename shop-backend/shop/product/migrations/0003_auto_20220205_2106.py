# Generated by Django 3.2.4 on 2022-02-05 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20220128_2133'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvariants',
            name='price',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='productvariants',
            name='stock',
            field=models.IntegerField(default=0),
        ),
    ]
