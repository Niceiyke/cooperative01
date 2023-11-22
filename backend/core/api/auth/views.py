import jwt
from dotenv import load_dotenv
import os

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.exceptions import AuthenticationFailed


# Import Serializers
from .serializers import UserSerializers
from .auth import get_tokens_for_user
from managements.models import AuditLog
from rest_framework.permissions import AllowAny

# Import Models
from accounts.models import CustomUser


class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]


class LoginUserView(APIView):
    # permission_classes = [AllowAny]

    def post(self, request):
        user = CustomUser.objects.filter(email=request.data["email"]).first()

        if not user:
            raise AuthenticationFailed(
                "You do not have an account or your email is wrong"
            )

        if not user.check_password(request.data["password"]):
            raise AuthenticationFailed("Incorrect Password")

        token = get_tokens_for_user(user)

        response = Response()
        response.set_cookie(key="access", value=token["access"], httponly=True)
        response.set_cookie(key="refresh", value=token["refresh"], httponly=True)

        AuditLog.objects.create(
            user=user, action=f"User {user.last_name} just logged in"
        )

        response.data = {"access": token["access"], "refresh": token["refresh"]}

        return response


class UserView(APIView):
    def get(self, request):
        load_dotenv()
        token = request.COOKIES.get("access")

        if not token:
            raise AuthenticationFailed("Unauthenticated")
        try:
            payload = jwt.decode(
                token,
                key=os.environ.get("SECRET_KEY"),
                algorithms=["HS256"],
            )

            user = CustomUser.objects.filter(id=payload["user_id"]).first()
            return Response(
                {
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "sap_number": user.sap_number,
                }
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthorised")

        return Response({"message": "success"})
