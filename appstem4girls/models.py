from django.db import models

class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    web = models.URLField(blank=True)
    logo = models.ImageField(upload_to='proveedores/', blank=True)

    def __str__(self):
        return self.nombre


class Tag(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Recurso(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_publicacion = models.DateField(auto_now_add=True)
    enlace = models.URLField(blank=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='recursos')
    tags = models.ManyToManyField(Tag, related_name='recursos')
    imagen = models.ImageField(upload_to='recursos/', blank=True)

    def __str__(self):
        return self.titulo
