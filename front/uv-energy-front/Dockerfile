FROM node

#donde esta mi codigo
WORKDIR /code
#donde estaran las librerias de mi dependencia
ENV PATH ./node_modules/.bin:$PATH

#lista de mis dependencias
COPY package*.json ./
#

#a ejecutar
RUN ls
#RUN npm install
#RUN npm install react-scripts@3.3.1 -g

COPY . .
#al iniciar el contenedor
CMD ["npm","start"]
