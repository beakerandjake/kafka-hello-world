FROM node:21-alpine
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install 

COPY ./src .

CMD ["node", "server.js"]