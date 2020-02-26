from .models import User
from rest_framework import viewsets, permissions, generics
from .serializers import UserSerializer


# User ViewSet
class APIUser (generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
