FROM node:12

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm ci

COPY ./server .

EXPOSE 5000
CMD ["npx", "babel-node", "./index.js"]

