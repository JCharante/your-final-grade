FROM node:14.4

WORKDIR /usr/src/yfg-ws

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD npm run start

EXPOSE 3002
