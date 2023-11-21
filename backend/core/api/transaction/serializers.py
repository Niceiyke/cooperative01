from rest_framework import serializers, status
from rest_framework.response import Response

from transaction.models import Transaction, TransactionType
from api.services import update_contribution_amount


class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    transaction_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"

        extra_kwargs = {"transaction_type": {"write_only": True}}

    def get_transaction_name(self, obj):
        name = obj.transaction_type.name
        return name

    def create(self, validated_data):
        response = update_contribution_amount(
            member_object=validated_data["member"],
            transaction_amount=validated_data["amount"],
            transaction_type_object=validated_data["transaction_type"],
        )

        if response["status"].value == 200:
            return super().create(validated_data)

        raise serializers.ValidationError(response["error"])
