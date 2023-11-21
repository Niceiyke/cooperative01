# Generated by Django 4.2.7 on 2023-11-21 09:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0001_initial'),
        ('loans', '0004_loan_is_disbursed_alter_loan_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='member',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='member', to='members.member'),
        ),
    ]