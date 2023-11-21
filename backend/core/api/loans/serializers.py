from rest_framework import serializers, status
from loans.models import Loan, LoanType, LoanRepayment
from api.services import (
    pay_loan,
    process_loan_transaction,
    check_loan_eligibility,
    update_contribution_amount,
)


class LoanTypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = LoanType
        fields = "__all__"


class LoanSerializers(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    loan_types = serializers.SerializerMethodField()

    class Meta:
        model = Loan
        fields = [
            "id",
            "borrowed_amount",
            "repaid_amount",
            "member",
            "loan_type",
            "is_active",
            "owner",
            "loan_types",
        ]

    def get_owner(self, obj):
        owner = f"{obj.member.user.first_name} {obj.member.user.last_name}"
        return owner

    def get_loan_types(self, obj):
        type = f"{obj.loan_type.name}"
        return type

    def create(self, validated_data):
        response = check_loan_eligibility(
            member_object=validated_data["member"],
            selected_loan_type=validated_data["loan_type"],
            requested_amount=validated_data["borrowed_amount"],
        )

        if response["status"] == True:
            process_loan_transaction(
                transaction_amount=response["borrowed_amount"],
                member_object=validated_data["member"],
                transaction_type="Debit",
                loan_status=validated_data["is_active"],
            )
            response = super().create(validated_data)
            response.is_active = True

            response.save()
            return response

        raise serializers.ValidationError(response["error"])


class LoanRepaymentSerializers(serializers.ModelSerializer):
    class Meta:
        model = LoanRepayment
        fields = "__all__"

    def create(self, validated_data):
        response = pay_loan(
            amount=validated_data["borrowed_amount"], loan=validated_data["loan"]
        )

        if response["status"] == 200:
            process_loan_transaction(
                transaction_type="Credit",
                transaction_amount=validated_data["borrowed_amount"],
                member_object=validated_data["loan"].member,
            )
            return super().create(validated_data)

        else:
            raise serializers.ValidationError(response["error"])
