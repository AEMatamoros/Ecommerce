# IndustriaCracks

#Para iniciar el proyecto
1. Clonar el repositorio
```
git clone https://github.com/Mirror18/IndustriaCracks.git

```

2. Iniciar un entorno virtual
```
virtualenv -p python3.8 venv
source ./venv/Script/activate

```

3. Instalar las dependencias 
```
pip install django
pip install djangorestframework
pip install Pillow
pip install django-cors-headers
pip install -U drf-yasg
pip install -U drf-yasg[validation]
```
4. Ejecutar las migraciones
```
python manage.py makemigrations
python manage.py migrate

```
5. Ejecutarlo 
```
python manage.py runserver

```

6. Crear Componentes 
>Para Home
```
ng g c pages/home/<nombre_componente> -m=pages/home/home

Ir al archivo child-routes.module de home y crear la ruta

```

>Para Admin
```
ng g c pages/panel-admin/<nombre_componente> -m=pages/panel-admin/panel-admin

Ir al archivo child-routes.module de panel-admin y crear la ruta

```
