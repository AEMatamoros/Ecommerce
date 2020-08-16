# Generated by Django 3.0.8 on 2020-08-14 17:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200730_1120'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sells',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('costumer_user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluator_user_id', to=settings.AUTH_USER_MODEL, verbose_name='Comprador')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='api.Product', verbose_name='Producto')),
                ('seller_user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='evaluated_user_id', to=settings.AUTH_USER_MODEL, verbose_name='Vendedor')),
            ],
            options={
                'verbose_name': 'sells',
                'verbose_name_plural': 'sells',
            },
        ),
        migrations.DeleteModel(
            name='Puntuation',
        ),
    ]