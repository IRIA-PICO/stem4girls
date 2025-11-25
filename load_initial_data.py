from django.core.management import call_command
from django.db import connection

def load_data_if_empty():
    from appstem4girls.models import Proveedor
    if Proveedor.objects.count() == 0:
        print("Cargando data.json...")
        try:
            call_command('loaddata', 'data.json')
            print("Datos cargados correctamente.")
        except Exception as e:
            print(f"Error cargando datos: {e}")
    else:
        print("Datos ya existen. No se carga nada.")
