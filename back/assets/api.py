from assets.models import ElectricTransformer, Substation
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from .serializers import ElectricTransformerSerializers, SubStationSerializers
# electric transformer viewsets


class ElectricTransformerViewSet(viewsets.ModelViewSet):
    queryset = ElectricTransformer.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ElectricTransformerSerializers


class SubStationViewSet(viewsets.ModelViewSet):
    queryset = Substation.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SubStationSerializers
