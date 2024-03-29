# Generated by Django 4.2.7 on 2023-11-20 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0002_loanrepayment_alter_loan_date_approved_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='loanrepayment',
            old_name='amount_paid',
            new_name='amount',
        ),
        migrations.AddField(
            model_name='loan',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='loan',
            name='repayment_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
