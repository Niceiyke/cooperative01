from django.db import models
from accounts.models import CustomUser


class Portfolio(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Executive(models.Model):
    name = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name.first_name} {self.name.last_name} - {self.portfolio.name}"


class AuditLog(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, blank=True
    )
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.timestamp} - {self.user.last_name if self.user else 'System'} - {self.action}"
