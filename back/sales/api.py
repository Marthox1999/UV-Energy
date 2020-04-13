from sales.models import Bill
from assets.models import Meter
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import BillSerializers
from django.db.models import Q
# bill viewsets

class BillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        print(pk)
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
            print(meter.pk_meter)
        print(meter)
        queryset = Bill.objects.filter(fk_meter__in=meter_ids)
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)
     
