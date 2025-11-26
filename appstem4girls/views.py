from django.shortcuts import render, get_object_or_404
from .models import Recurso, Proveedor, Tag, Mujeres
from django.http import JsonResponse
from django.urls import reverse
from django.db.models import Q

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


def detalle_recurso(request, recurso_id):
    recurso = get_object_or_404(Recurso, id=recurso_id)
    return render(request, 'detalle_recurso.html', {'recurso': recurso})


def lista_proveedores(request):
    proveedores = Proveedor.objects.all()
    return render(request, 'lista_proveedores.html', {'proveedores': proveedores})


def detalle_proveedor(request, proveedor_id):
    proveedor = get_object_or_404(Proveedor, id=proveedor_id)
    recursos = proveedor.recursos.all().order_by('-fecha_publicacion')
    return render(request, 'detalle_proveedor.html', {'proveedor': proveedor, 'recursos': recursos})


def lista_tags(request):
    tags = Tag.objects.all()
    return render(request, 'lista_tags.html', {'tags': tags})


def detalle_tag(request, tag_id):
    tag = get_object_or_404(Tag, id=tag_id)
    return render(request, 'detalle_tag.html', {'tag': tag})

def mujeres_lideres(request, ):
    #ordenadas por fecha de nacimiento
    mujeres = Mujeres.objects.all().order_by('fecha_NCTO')
    
    context = {
        'mujeres': mujeres
    }
    return render(request, 'mujeres_lideres.html', context)

#JAVASCRIPT
def ajax_search(request):
    """
    GET ajax/search/?q=...
    Devuelve JSON:
    { 'recursos': [{id, titulo, url}] }
    """
   
    q = request.GET.get('q', '').strip()
    results = {'recursos': []}

    if not q:
        return JsonResponse(results)

    # 1) Buscar recursos por titulo, descripcion o tags
    recursos_qs = Recurso.objects.filter(
        Q(titulo__icontains=q) |
        Q(descripcion__icontains=q) |
        Q(tags__nombre__icontains=q)
    ).distinct()

    # 2) Buscar proveedores que coincidan
    proveedores_qs = Proveedor.objects.filter(
        Q(nombre__icontains=q) |
        Q(descripcion__icontains=q) |
        Q(ciudad__icontains=q)
    ).distinct()

    # 3) Si hay proveedores que coinciden, añadir TODOS sus recursos
    if proveedores_qs.exists():
        recursos_de_proveedores = Recurso.objects.filter(
            proveedor__in=proveedores_qs
        ).distinct()
        recursos_qs = (recursos_qs | recursos_de_proveedores).distinct()

    # Limitar resultados
    recursos_qs = recursos_qs[:20]

    # 4) Construccion del JSON
    for r in recursos_qs:
        results['recursos'].append({
        'id': r.id,
        'titulo': r.titulo,
        'url': reverse('detalle_recurso', args=[r.id]),
        'imagen_url': r.imagen.url if r.imagen else '',  # url de la imagen
        'descripcion': r.descripcion[:100] if r.descripcion else '',  # recortada
        'tags': [{'id': t.id, 'nombre': t.nombre} for t in r.tags.all()],
        'fecha_publicacion': r.fecha_publicacion.strftime("%d %b %Y") if r.fecha_publicacion else ''
    })
    return JsonResponse(results)
