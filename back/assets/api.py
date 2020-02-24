from assets.models import ElectricTransformer, Substation
from rest_framework import viewsets, permissions
from .serializers import ElectricTransformerSerializers, SubStationSerializers

# electric transformer viewsets


class ElectricTransformerViewSet(viewsets.ModelViewSet):
    queryset = ElectricTransformer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ElectricTransformerSerializers

class SubStationViewSet(viewsets.ModelViewSet):
    queryset = Substation.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SubStationSerializers