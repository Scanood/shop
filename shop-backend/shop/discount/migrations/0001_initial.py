# Generated by Django 3.2.4 on 2022-02-08 05:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('category', '0001_initial'),
        ('product', '0003_auto_20220205_2106'),
    ]

    operations = [
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('slug', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('fixed', 'fixed'), ('percentage', '%')], default='fixed', max_length=10)),
                ('value', models.FloatField(default=0)),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
                ('is_delete', models.BooleanField(default=False)),
                ('categories', models.ManyToManyField(blank=True, to='category.Category')),
                ('products', models.ManyToManyField(blank=True, to='product.Products')),
            ],
        ),
    ]
