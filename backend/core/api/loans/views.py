from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.exceptions import AuthenticationFailed
from loans.models import Loan, LoanRepayment
from django.shortcuts import get_object_or_404

from .serializers import LoanSerializers, LoanRepaymentSerializers


class ListCreateLoanView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializers


class ListCreateLoanRepaymentView(generics.ListCreateAPIView):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializers


class LoanApprovalAPIView(APIView):
    def get(self, request, pk):
        loan = get_object_or_404(Loan, pk=pk)
        serializer = LoanSerializers(loan)

        return Response(serializer.data)

        if (
            not loan.is_tresurer_approved
            and not loan.is_president_approved
            and not loan.is_petron_approved
        ):
            # Only proceed if the treasurer has approved the loan
            return Response(
                {"detail": "The treasurer has not approved this loan."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if loan.is_approved:
            return Response(
                {"detail": "This loan has already been approved."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Perform your approval logic here
        loan.is_approved = True
        loan.save()

        return Response(
            {"detail": "Loan approved successfully."}, status=status.HTTP_200_OK
        )
