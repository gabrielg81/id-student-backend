FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install prisma @prisma/client

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080
CMD [ "npm", "start" ]