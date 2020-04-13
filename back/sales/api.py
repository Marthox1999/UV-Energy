from sales.models import Bill
from assets.models import Meter
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
        queryset =Bill.objects.filter(Q(fk_meter__isActive=True))
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)

    
class BillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    print('hola1')
    def list(self, request):
        print('hola2')
        pk=request.query_params.get('pk_cliente')
        print(pk)
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
                meter_id.append(meter.pk_meter)
        queryset = Bill.objects.filter(fk_meter__in=meter_ids)
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)
        
