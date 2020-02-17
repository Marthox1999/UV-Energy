from django.db import models
from django.core.validators import RegexValidator, validate_email
from django.utils import timezone
'''from users.models import Employee'''
from assets.models import Meter
# Create your models here.

# Bank


class Bank(models.Model):
    name = models.CharField(max_length=100, unique=True, primary_key=True)
    email = models.EmailField(max_length=50, blank=False,
                              unique=True, validators=[validate_email])

# Debit payment


class DebitPayment(models.Model):
    pk_debit_payment = models.AutoField(primary_key=True)
    fk_bank = models.ForeignKey(Bank, on_delete=models.SET_NULL,
                                null=True)

'''fk_employee = models.ForeignKey(Employee, on_delete=models.SET_NULL,
                                    null=True)'''

# Bill


class Bill(models.Model):
    pk_bill = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    read = models.IntegerField(default=1)
    expedition_date = models.DateField()
    expiration_date = models.DateField()
    is_paid = models.BooleanField(default=False)
    fk_debit_payment = models.ForeignKey(DebitPayment,
                                         on_delete=models.SET_NULL,
                                         null=True)
    fk_meter = models.ForeignKey(Meter,
                                 on_delete=models.SET_NULL,
                                 null=True)


'''fk_employee = models.ForeignKey(Employee, on_delete=models.SET_NULL,
                                    null=True)'''
