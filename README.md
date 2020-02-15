# UV-Energy

UV-Energy es una aplicacion web para la empresa ficticia UV-Energy desarrollada por estudiantes de la universidad del valle, la cual busca dar soporte al funcionamiento de esta empresa que presta el servicio de suministro electrico

## Instrucciones para instalar

1. En el directorio ```./front/uv-energy-front``` ejecutar ```npm install```
2. Regresar al directorio raiz y ejecutar ```docker-compose up --build```

## Puertos

Los programas estaran corriendo en los siguientes puertos:

- React:8000
- Django:7000
- Elasticsearch:9200

## Instalacion de los "Linter" para estandares de codigo

### Python

- Ejecute ```sudo pip3 install pylint``` para instalar el "Linter"
- Instale el estandar de codigo __pep 8__ ejecutando ```sudo pip3 install pep 8```
- En la interfaz de VSCode presione el comando (```Crtl + Shift + P```)
- En la interfaz que se despliega luego del comando anterior seleccione __Python: Select Linter__
- Luego seleccione "pycodestyle" el cual hace referencia al estandar de codigo __pep 8__

Para mas informacion visitar [pep 8](https://code.visualstudio.com/docs/python/linting#_pep8-pycodestyle)

### Javascript and React

- Ejecute ```sudo npm install -g eslint``` para instalar el "Linter"
- Ejecute ```eslint --init``` para iniciar el "Linter"
- Respoder el questionario que aparecera de la siguiente manera
  - How would you like to use ESlint? __R/To check syntax, find problems, and enforce code style__
  - What type of modules does your project use? __R/Javascript modules (import/export)__
  - Which framework does your project use? __R/React__
  - Does your project use Typescript? __R/N__
  - Where does your code run? __R/Browser__
  - How would you like to define a style for your project? __R/Use a popular style guide__
  - Which style guide do you want to follow? __R/[Airbnb](https://github.com/airbnb/javascript)__
  - What format do you want your config file to be in? __R/JSON__
