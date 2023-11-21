from django.contrib import admin

# Register your models here.
from . import models

# Register your models here.
admin.site.register(models.Executive)
admin.site.register(models.Portfolio)
admin.site.register(models.AuditLog)
