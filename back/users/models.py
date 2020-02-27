from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
# Users: employee and client


class User(AbstractUser):
    POSITION = {
        ('MGR', 'Manager'),
        ('ADMIN', 'Administrator'),
        ('OP', 'Operator'),
        ('CLT', 'Client')
    }
    position = models.CharField(max_length=5, choices=POSITION, default='CLT')
    cellphone_regex = RegexValidator(regex=r'^\+?1?\d{7,10}$',
                                     message='''The cellphone must be:
                                                '+7777777'.
                                                Up to 10 digits allowed.''')
    cellphone = models.CharField(validators=[cellphone_regex],
                                 max_length=12,
                                 blank=True)
