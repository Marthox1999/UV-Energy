FROM node

#donde esta mi codigo
WORKDIR /code
#donde estaran las librerias de mi dependencia
COPY ./uv-energy-front/package.json ./package.json

RUN npm install

COPY ./uv-energy-front/ .

#al iniciar el contenedor
CMD ["npm","start"]
