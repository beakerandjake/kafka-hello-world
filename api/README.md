# api

API which serves data to the frontend.

Built with `fastify`, `kafkajs`, and `pg`.

## Routes

### /stocks 

Returns a list of information about all stocks.

### /stocks/:ticker/price

Returns the latest price information of the stock.

### /stocks/:ticker/history

Returns a list of price history of the stock up to the current time. 

### /stocks/realtime

Uses SSE to continually push the latest price changes. Internally it uses `kafkajs` to subscribe to the stock change topic.

## Usage

This application depends on the kafka and postgres containers existing, and is intended to be ran through docker compose.

At the root of the repo run:

```sh
docker compose up -d
```

After all the containers have started up you can verify the api is serving data by running: 

```sh
curl localhost:8080/api/stocks
```

**NOTE**: The api runs in its own container and listens on the internal docker compose network on port 3000 (by default). It is exposed to the host machine via a separate container called `reverse-proxy` which is exposed at `localhost:8080` (by default).

## Configuration

The producer can be configured via environment variables set in the `compose.yml` file.

- `API_PG_HOST` - The name of the postgres host to connect to.
- `API_PG_PORT` - The port to connect to postgres with.
- `API_PG_USER` - The username to connect to postgres as.
- `API_PG_PASSWORD` - The password to use when connecting to postgres.
- `API_KAFKA_BROKER` - The host of the kafka broker to connect to.
- `API_KAFKA_TOPIC` - The kafka topic to subscribe to price changes on.
- `API_PORT` - The port to listen to requests on.
