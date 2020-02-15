from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Abstract user fields
    # 1) numero de documento 2) date_joined 3)email
    # 4) fecha_nacimiento
    class Meta:
        ordering = ['first_name','last_name']

    def __str__(self):
        return self.get_full_name()

    cedula = models.CharField(unique=True, max_length=20)

    ADMINISTRADOR = 'administrador'
    GERENTE = 'gerente'
    OPERADOR = 'operador'
    JEFE = 'jefe'
