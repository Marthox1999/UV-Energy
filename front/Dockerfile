FROM node

#donde esta mi codigo
WORKDIR /code
#donde estaran las librerias de mi dependencia
ENV PATH ./node_modules/.bin:$PATH

#lista de mis dependencias
COPY ./uv-energy-front/package.json ./package.json
COPY ./uv-energy-front/package-lock.json ./package-lock.json
#
COPY ./uv-energy-front/src/ ./src

#a ejecutar
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY ./uv-energy-front/ .
#al iniciar el contenedor
CMD ["npm","start"]
