from assets.models import ElectricTransformer
from rest_framework import viewsets, permissions
from .serializers import ElectricTransformerSerializers

# electric transformer viewsets


class ElectricTransformerViewSet(viewsets.ModelViewSet):
    queryset = ElectricTransformer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ElectricTransformerSerializers
