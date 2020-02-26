from rest_framework import serializers
from .models import User

# Class user serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(username='123',
                                        email='123@123',
                                        password='123')
        user.save()
        return user
