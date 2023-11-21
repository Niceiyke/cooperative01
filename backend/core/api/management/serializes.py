from rest_framework import serializers


from api.member.serializers import MemberSerializer


class LoanApprovalSerializers(serializers.Serializer):
    owner = MemberSerializer()
    loan_type = serializers.CharField()
    requested_loan_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    tresurer_approved = serializers.BooleanField()
    president_approved = serializers.BooleanField()
    petron_approved = serializers.BooleanField()
