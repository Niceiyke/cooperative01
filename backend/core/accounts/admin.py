from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "sap_number",
        "is_active",
        "is_staff",
    )
    list_filter = ("is_active", "is_staff")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "sap_number")}),
        (
            "Permissions",
            {"fields": ("is_active", "is_staff", "groups", "user_permissions")},
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "sap_number",
                    "is_active",
                    "is_staff",
                ),
            },
        ),
    )
    search_fields = ("email", "sap_number")
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)
