from django.shortcuts import render, get_object_or_404
from .models import Recurso, Proveedor, Tag


def index(request):
    proveedores = Proveedor.objects.all()
    recursos_destacados = []
    for proveedor in proveedores:
        recurso = proveedor.recursos.order_by('-fecha_publicacion').first()
        if recurso:
            recursos_destacados.append(recurso)

    context = {
        'recursos_destacados': recursos_destacados,
    }
    return render(request, 'index.html', context)