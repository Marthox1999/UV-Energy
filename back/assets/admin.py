from django.contrib import admin
from .models import Substation, ElectricTransformer, Meter

# Register your models here.
admin.site.register(Substation)
admin.site.register(ElectricTransformer)
admin.site.register(Meter)
