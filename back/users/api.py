from .models import User
from rest_framework import viewsets, permissions
from .serializers import UserSerializer


# User ViewSet
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
