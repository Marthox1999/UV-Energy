from .models import User
from rest_framework import viewsets, permissions
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )

    queryset = User.objects.all()
    serializer_class = UserSerializer
