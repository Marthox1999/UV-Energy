from rest_framework import serializers
from sales.models import Bill


class BillSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'



