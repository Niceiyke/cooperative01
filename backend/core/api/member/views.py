import os
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from managements.models import AuditLog


from .serializers import MemberSerializer, MemberUpdateSerializer,MemberUpdateContributionSerializer

from members.models import Member


class MemberView(generics.RetrieveAPIView):
    # authentication_classes = ()
    # permission_classes = [IsAuthenticated]
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        # if response.status_code == 200:
        # AuditLog.objects.create(user=request.user,action=f"member {request.user.last_name} retrieved member detail",)

        return super().finalize_response(request, response, *args, **kwargs)


class MemberUpdate(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberUpdateSerializer


class MemberUpdateContribution(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberUpdateContributionSerializer