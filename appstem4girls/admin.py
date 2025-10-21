from django.contrib import admin

from .models import Proveedor, Tag, Recurso
admin.site.register(Proveedor)
admin.site.register(Tag)
admin.site.register(Recurso)