#!bin/sh

echo "Migraciones"
python manage.py makemigrations 
python manage.py migrate

# ejemplo cuando querramos precargar datos
#python manage.py loaddata inventario_nova.json

# echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', '123')" | python manage.py shell


exec "$@"