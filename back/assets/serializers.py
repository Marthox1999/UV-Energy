from rest_framework import serializers
from assets.models import ElectricTransformer, Substation


class ElectricTransformerSerializers(serializers.ModelSerializer):
    class Meta:
        model = ElectricTransformer
        fields = '__all__'


class SubStationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Substation
        fields = '__all__'

class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'