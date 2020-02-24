from rest_framework import serializers
from .models import User

# Class user serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
