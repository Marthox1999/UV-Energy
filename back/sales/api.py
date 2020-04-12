from sales.models import Bill
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import BillSerializers
from django.db.models import Q
# bill viewsets


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = BillSerializers


class ActiveBillViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Bill.objects.filter(Q(is_paid=False))
        serializer = Bill(queryset, many=True)
        return Response(serializer.data)
