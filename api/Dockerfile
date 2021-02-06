FROM node:14.4

WORKDIR /usr/src/yfg-api

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD npm run start

EXPOSE 3001
