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
