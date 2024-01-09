# consumer-realtime

A kafka consumer which listens to stock price change events and saves the events to a database.

Built with confluent_kafka and psycopg2.

## Usage

This application depends on the kafka and postgres containers existing, and is intended to be ran through docker compose.

At the root of the repo run:

```
docker compose up
```

After all the containers have started up you can verify it is consuming by viewing the logs:

```
docker logs consumer-realtime --follow
```

Alternatively you can query the postgres container for a row count

```
docker exec -it postgres psql -U postgres -c 'select count(*) from price_changes;'
```

## Configuration

The producer can be configured via environment variables set in the `compose.yml` file.

- `CONSUMER_TOPIC` - The name of the kafka topic to consume messages from.
- `CONSUMER_GROUP_ID` - The group id to use when connecting to kafka.
- `PGHOST` - The name of the postgres host to connect to.
- `PGUSER` - The username to connect to postgres as.
- `PGPASSWORD` - The password to use when connecting to postgres.
