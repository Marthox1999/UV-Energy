from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.response import  Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer


# User ViewSet
class UserViewSet (viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class ProfileViewSet (viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        return Response({
            'notCredentials':{
                'token':token.key, 'id':token.user_id, 'position':user.position
            }
        })
