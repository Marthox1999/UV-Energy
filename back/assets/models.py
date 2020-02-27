from django.db import models
from django.core.validators import RegexValidator, validate_email
from django.core.validators import MaxValueValidator, MinValueValidator
from users.models import User
# Create your models here.
# transformadores, subestaciones, contador


# Subestacion


class Substation(models.Model):
    alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$',
                                  'Only alphanumeric characters are allowed.')
    pk_substation = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True,
                            validators=[alphanumeric])
    long = models.DecimalField(max_digits=18, decimal_places=15)
    lat = models.DecimalField(max_digits=18, decimal_places=15)
    isActive = models.BooleanField(default=True)


# Transformadores


class ElectricTransformer(models.Model):
    alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$',
                                  'Only alphanumeric characters are allowed.')

    pk_transformers = models.AutoField(primary_key=True)
    tension_level = models.IntegerField()
    reference = models.CharField(validators=[alphanumeric],
                                 max_length=8,
                                 blank=True)

    long = models.DecimalField(max_digits=9, decimal_places=6)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    fk_substation = models.ForeignKey(Substation,
                                      on_delete=models.SET_NULL,
                                      null=True)
    isActive = models.BooleanField(default=True)

# Meter


class Meter(models.Model):
    USE = {
        ('RES', 'Residencial'),
        ('IND', 'Industrial')
    }
    CITY = {
        ('BOG', 'Bogotá'),
        ('MED', 'Medellín'),
        ('CALI', 'Cali'),
        ('B/Q', 'Barranquilla'),
        ('CART', 'Cartagena'),
        ('CUC', 'Cucuta'),
        ('SOL', 'Soledad'),
        ('IBG', 'Ibague'),
        ('BCM', 'Bucaramanga'),
        ('SOAC', 'Soacha'),
    }
    pk_meter = models.AutoField(primary_key=True)
    address = models.CharField(max_length=32)
    stratum = models.IntegerField(default=1,
                                  validators=[MinValueValidator(1),
                                              MaxValueValidator(6)])
    city = models.CharField(max_length=4, choices=CITY, default='CALI')
    use = models.CharField(max_length=3, choices=USE, default='RES')
    fk_electric_transformers = models.ForeignKey(ElectricTransformer,
                                                 on_delete=models.SET_NULL,
                                                 null=True)
    fk_client = models.ForeignKey(User,
                                  on_delete=models.SET_NULL,
                                  null=True)
    isActive = models.BooleanField(default=True)

# Subestacion


class Admin(models.Model):
    alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$',
                                  'Only alphanumeric characters are allowed.')
    pk_substation = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True,
                            validators=[alphanumeric])
    long = models.DecimalField(max_digits=18, decimal_places=15)
    lat = models.DecimalField(max_digits=18, decimal_places=15)
    isActive = models.BooleanField(default=True)
