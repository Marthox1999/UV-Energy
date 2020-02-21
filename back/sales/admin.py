from django.contrib import admin
from .models import Bank, DebitPayment, Bill
# Register your models here.
admin.site.register(Bank)
admin.site.register(DebitPayment)
admin.site.register(Bill)
