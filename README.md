# stem4girls
# STEM4Girls es una plataforma creada para visibilizar, conectar y empoderar a mujeres dentro del ámbito STEM (Ciencia, Tecnología, Ingeniería y Matemáticas). El proyecto permite explorar recursos, proveedores y etiquetas relacionadas, además de descubrir a mujeres líderes inspiradoras en estos campos.
Django (Python) – para la gestión del backend, modelos y plantillas.
HTML + CSS – para el diseño de la interfaz y la maquetación responsive.
JavaScript (en secciones dinámicas).
Base de datos SQLite (por defecto de Django).
Plantillas de Django con herencia (extends, block, static, url).
Durante el desarrollo, ChatGPT se ha utilizado como asistente técnico y de diseño para optimizar y aprender sobre buenas prácticas.
En concreto, se ha empleado en:

Plantillas y lógica Django:
En lista_tags.html → uso del filtro pluralize para mostrar correctamente el plural en los recursos.
Asesoramiento sobre cómo implementar herencia de plantillas (extends, block contenido, etc.).

Estilos y maquetación:
En los iconos de contacto del detalle de proveedor.
En la definición de degradados personalizados (color transitions).
En el contenedor de proveedores (prov-contenedor) → uso de repeat(auto-fit) para la rejilla responsive.
En los efectos box-shadow de .prov-tarjeta y .lr (ajustes visuales).
En recurso.css → ayuda con el ratio 16/9 para vídeos y creación del hover animado.
En las media queries y en transformaciones CSS más avanzadas.

Instalación

1. Crear y activar un entorno virtual:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt y en el requirements.txt incluye:
asgiref==3.9.2
brotli==1.2.0
click==8.3.1
colorama==0.4.6
dj-database-url==3.0.1
Django==5.2.6
gunicorn==23.0.0
h11==0.16.0
packaging==25.0
pillow==12.0.0
psycopg2-binary==2.9.11
sqlparse==0.5.3
tzdata==2025.2
uvicorn==0.38.0
whitenoise==6.11.0

Proyecto desarrollado por:
Oihane Garcia, Leire Miragaya e Iria Picó
