# build layer
FROM node:21-alpine as build
# install deps needed for node-rdkafka
RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python3
WORKDIR /src
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
# remove node-rdkafka build files not needed for runtime
RUN rm -rf node_modules/node-rdkafka/deps node_modules/node-rdkafka/build/deps/*.a

# main layer
FROM node:21-alpine
# install node-rdkafka runtime deps
RUN apk add --no-cache lz4-dev cyrus-sasl
WORKDIR /app
COPY --from=build /src/node_modules ./node_modules
COPY package.json package.json
COPY ./src .
CMD ["node", "server.js"]
