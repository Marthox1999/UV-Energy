from assets.models import ElectricTransformer, Substation, Meter
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import ElectricTransformerSerializers, SubStationSerializers
from django.db.models import Q
# electric transformer viewsets


class ElectricTransformerViewSet(viewsets.ModelViewSet):
    queryset = ElectricTransformer.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ElectricTransformerSerializers


class ActiveETViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = ElectricTransformer.objects.filter(Q(fk_substation__isActive=True), Q(isActive=True))
        serializer = ElectricTransformerSerializers(queryset, many=True)
        return Response(serializer.data)


class SubStationViewSet(viewsets.ModelViewSet):
    queryset = Substation.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SubStationSerializers

class ActiveSubStationViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Substation.objects.filter(Q(isActive=True))
        serializer = SubStationSerializers(queryset, many=True)
        return Response(serializer.data)
    