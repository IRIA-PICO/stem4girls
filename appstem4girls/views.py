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

def lista_recursos(request):
    recursos = Recurso.objects.all()
    return render(request, 'lista_recursos.html', {'recursos': recursos})


def detalle_recurso(request, id):
    recurso = get_object_or_404(Recurso, id=id)
    return render(request, 'detalle_recurso.html', {'recurso': recurso})


def lista_proveedores(request):
    proveedores = Proveedor.objects.all()
    return render(request, 'lista_proveedores.html', {'proveedores': proveedores})


def detalle_proveedor(request, id):
    proveedor = get_object_or_404(Proveedor, id=id)
    return render(request, 'detalle_proveedor.html', {'proveedor': proveedor})


def lista_tags(request):
    tags = Tag.objects.all()
    return render(request, 'lista_tags.html', {'tags': tags})


def detalle_tag(request, id):
    tag = get_object_or_404(Tag, id=id)
    return render(request, 'detalle_tag.html', {'tag': tag})