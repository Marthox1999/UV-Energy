from .models import User
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import UserSerializer
from django.db.models import Q


# User ViewSet
class UserViewSet (viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


#Active Manager viewSet
class ActiveManagerViewSet (viewsets.ViewSet):
    def list(self, request):
        queryset = User.objects.filter(Q(position="MGR") & Q(is_active=True))
        serializer = UserSerializer(queryset,many=True)
        return Response(serializer.data)

#Active Admin viewSet
class ActiveAdminViewSet (viewsets.ViewSet):
    def list(self, request):
        queryset = User.objects.filter(Q(position="ADMIN") & Q(is_active=True))
        serializer = UserSerializer(queryset,many=True)
        return Response(serializer.data)