from rest_framework import serializers
from assets.models import ElectricTransformer


class ElectricTransformerSerializers(serializers.ModelSerializer):
    class Meta:
        model = ElectricTransformer
        fields = '__all__'
