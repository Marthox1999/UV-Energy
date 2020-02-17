from django.db import models
from django.contrib.auth.models import AbstractUser


class Client(models.Model):
    cc = models.CharField(unique=True, max_length=20)

# Employee


class Employee(AbstractUser):
    POSITION = {
        ('MGR', 'Manager'),
        ('ADMIN', 'Administrator'),
        ('OP', 'Operator')
    }
    pk_employee = models.CharField(unique=True,
                                   max_length=10,
                                   primary_key=True)
    position = models.CharField(max_length=5, choices=POSITION, default='OP')
