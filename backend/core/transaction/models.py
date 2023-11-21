from django.db import models
from members.models import Member


# Create your models here.
class TransactionType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    transaction_type = models.ForeignKey(TransactionType, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.member.user.first_name} {self.member.user.last_name} - {self.amount} {self.transaction_type}"
