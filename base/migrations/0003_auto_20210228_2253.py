# Generated by Django 3.1.7 on 2021-03-01 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_auto_20210228_2249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='itemsPrice',
            field=models.DecimalField(decimal_places=2, max_digits=7, null=True),
        ),
    ]