FROM node:13.8.0

#donde esta mi codigo
WORKDIR /code
#donde estaran las librerias de mi dependencia
ENV PATH ./node_modules/.bin:$PATH

#lista de mis dependencias
COPY package*.json ./
#

#RUN npm --version
RUN npm install
RUN npm install react-scripts@3.3.1 -g
RUN npm install node-sass --save

COPY . .
#al iniciar el contenedor
CMD ["npm","start"]
