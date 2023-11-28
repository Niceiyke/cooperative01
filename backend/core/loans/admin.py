from django.contrib import admin

# Register your models here.
from . import models

# Register your models here.
admin.site.register(models.LoanType)
admin.site.register(models.Loan)
admin.site.register(models.LoanRepayment)
admin.site.register(models.HomeAppliance)
admin.site.register(models.FoodItem)