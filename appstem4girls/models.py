from django.db import models

class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    ciudad = models.CharField(max_length=150, blank=True)
    direccion = models.CharField(max_length=200, blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    web = models.URLField(blank=True, null=True) 
    
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
    imagen = models.ImageField(upload_to='images',blank=True,null=True,verbose_name='Image')

    def __str__(self):
        return self.titulo

class Mujeres(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='mujer_proveedor', null=True)
    fecha_NCTO= models.DateField(null=True, blank=True)
    def __str__(self):
        return self.nombre

