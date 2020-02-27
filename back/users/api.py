from .models import User
from rest_framework import viewsets, permissions
from .serializers import UserSerializer


# User ViewSet
class UserViewSet (viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer
