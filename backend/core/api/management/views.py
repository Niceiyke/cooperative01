from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from django.shortcuts import get_object_or_404

from loans.models import Loan
from transaction.models import Transaction
from api.loans.serializers import LoanSerializers

from .serializes import LoanApprovalSerializers


class LoanDetailView(APIView):
    def get(self, request, pk):
        loan = get_object_or_404(Loan, pk=pk)
        amount = loan.borrowed_amount
        owner = loan.member
        loan_type = loan.loan_type.name
        tresurer_approved = loan.is_tresurer_approved
        president_approved = loan.is_president_approved
        petron_approved = loan.is_petron_approved

        res = {
            "owner": owner,
            "loan_type": loan_type,
            "requested_loan_amount": amount,
            "tresurer_approved": tresurer_approved,
            "president_approved": president_approved,
            "petron_approved": petron_approved,
        }

        serializer = LoanApprovalSerializers(res)

        return Response(serializer.data)


class ListAllActiveLoans(generics.ListAPIView):
    queryset = Loan.objects.filter(is_active=True)
    serializer_class = LoanSerializers


class AccountBalances(APIView):
    def get(self, request):
        all_contribution = Transaction.objects.filter(transaction_type=1)
        all_contribution = sum([entry.amount for entry in all_contribution])

        active_loan_balance = Loan.objects.filter(is_active=True)
        active_loan_balance = sum([entry.amount for entry in active_loan_balance])

        return Response(
            {
                "all_contribution": all_contribution,
                "active_loan_balance": active_loan_balance,
            }
        )
