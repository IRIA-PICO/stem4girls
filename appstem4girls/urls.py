from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('recursos/', views.lista_recursos, name='lista_recursos'),
    path('recursos/<int:recurso_id>/', views.detalle_recurso, name='detalle_recurso'),
    path('proveedores/', views.lista_proveedores, name='lista_proveedores'),
    path('proveedores/<int:proveedor_id>/', views.detalle_proveedor, name='detalle_proveedor'),
    path('tags/', views.lista_tags, name='lista_tags'),
    path('tags/<int:tag_id>/', views.detalle_tag, name='detalle_tag'),
]
