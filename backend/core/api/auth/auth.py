from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import CustomUser


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


def get_user(email):
    user = CustomUser.objects.filter(email=email).first()

    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "sap_number": user.sap_number,
    }
