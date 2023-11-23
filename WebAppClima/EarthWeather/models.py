from django.db import models

# class Usuario(models.Model):
#     nombre = models.CharField(max_length=100)
#     contraseña = models.CharField(max_length=100)

class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo_electronico = models.EmailField(max_length=100)
    contrasena = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

