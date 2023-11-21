import os
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from .serializers import TransactionSerializer

from members.models import Member
from transaction.models import Transaction


class ListCreateTransaction(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
