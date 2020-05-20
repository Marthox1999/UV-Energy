from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.response import  Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import User
from assets.models import ElectricTransformer, Substation, Meter
from .serializers import UserSerializer
from django.db.models import Q
from django.contrib.auth.hashers import make_password


# User ViewSet
class UserViewSet (viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
    def update(self, request, pk=None):
        user = User.objects.get(id=pk)
        user.username = request.data['username']
        password = request.data['password']
        encoded_password = make_password(password, salt=None, hasher='default')
        user.password = encoded_password
        user.email = request.data['email']
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.cellphone = request.data['cellphone']
        user.save()

        sendpackage={
                "first_name":request.data['first_name'],
                "last_name":request.data['last_name'],
                "cellphone":request.data['cellphone'],
                "email":request.data['email'],
                "password":password
                }

        return Response(sendpackage)


# Active Manager viewSet
class ActiveManagerViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        queryset = User.objects.filter(Q(position="MGR") & Q(is_active=True))
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


# Active Admin viewSet
class ActiveAdminViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        queryset = User.objects.filter(Q(position="ADMIN") & Q(is_active=True))
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


# Active Operator viewSet
class ActiveOperatorViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        queryset = User.objects.filter(Q(position="OP") & Q(is_active=True))
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

# Active Client viewSet
class ActiveClientViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        queryset = User.objects.filter(Q(position="CLT") & Q(is_active=True))
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)    
    
class CreateClientViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from django.db import transaction
        '''
        Creacion del usuario
        '''
        with transaction.atomic():
            username = request.data['username']
            password = request.data['password']
            encoded_password = make_password(password, salt=None, hasher='default')
            email = request.data['email']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            is_active = request.data['is_active']
            cellphone = request.data['cellphone']
            position = request.data['position']
            user = User(username=username, password=encoded_password, email=email, first_name=first_name,
                        last_name=last_name, is_active=is_active, cellphone=cellphone, position=position)
            user.save()
            '''
            Creacion del contador
            '''
            address = request.data['address']
            stratum = request.data['stratum']
            city = request.data['city']
            use = request.data['use']
            pk_transformers = request.data['pk_transformers']
            transformer = ElectricTransformer.objects.get(pk_transformers=pk_transformers)
            meter = Meter(address=address, stratum=stratum, city=city, use=use, fk_electric_transformers=transformer,
                          fk_client=user)
            meter.save()

            sendpackage={
                "first_name":first_name,
                "last_name":last_name,
                "cellphone":cellphone,
                "email":email,
                "address":address,
                "stratum":stratum,
                "city":city,
                "use":use
                }

        return Response(sendpackage)  

class ProfileViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

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
            'notCredentials': {
                'token': token.key, 'id': token.user_id, 'position': user.position
            }
        })
