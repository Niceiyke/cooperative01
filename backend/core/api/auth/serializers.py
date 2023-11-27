from rest_framework import serializers
from rest_framework import status
from accounts.models import CustomUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["email"] = user.email
        token["member_id"] = user.member.id

        return token


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "email", "sap_number", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            sap_number=validated_data["sap_number"],
        )
        if user:
            user.set_password(validated_data["password"])
            user.save()
            # AuditLog.objects.create(user=red, action=f"new user {user.email} created")
            return user
        return {"message": "User not created"}
