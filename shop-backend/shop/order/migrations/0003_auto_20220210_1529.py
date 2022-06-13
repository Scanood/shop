# Generated by Django 3.2.4 on 2022-02-10 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_order_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='staff_fulfill',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('unfulfilled', 'unfulfilled'), ('fulfilled', 'fulfilled'), ('canceled', 'canceled'), ('Shipped', 'shipped'), ('refund', 'refund'), ('Received', 'received')], default='unfulfilled', max_length=32),
        ),
    ]
