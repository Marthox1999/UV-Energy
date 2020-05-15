from rest_framework import serializers
from assets.models import ElectricTransformer, Substation, Meter


class ElectricTransformerSerializers(serializers.ModelSerializer):
    class Meta:
        model = ElectricTransformer
        fields = '__all__'


class SubStationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Substation
        fields = '__all__'

class MeterSerializers(serializers.ModelSerializer):
    class Meta:
        model = Meter
        fields = '__all__'