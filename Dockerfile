FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install prisma @prisma/client

RUN npm install

RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN apt-get update && apt-get install -y google-chrome-unstable --fix-broken

COPY chromedriver /usr/local/bin/chromedriver

RUN chmod +x /usr/local/bin/chromedriver

COPY . .

RUN npx prisma generate

EXPOSE 8080
CMD [ "npm", "start" ]