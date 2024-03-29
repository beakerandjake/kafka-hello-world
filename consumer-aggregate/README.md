# consumer-aggregate

A kafka consumer which listens to stock price change events and aggregates those changes into a time based bucket, saving the results to the database.

By default it aggregates data in one minute windows and inserts the aggregated data  into the `price_aggregate` table.

Built with `confluent_kafka` and `psycopg2`.

## Usage

This application depends on the kafka and postgres containers existing, and is intended to be ran through docker compose.

At the root of the repo run:

```sh
docker compose up -d
```

After all the containers have started up you can verify it is consuming by viewing the logs:

```sh
docker logs consumer-aggregate --follow
```

Alternatively you can query the postgres container for a row count

```sh
docker exec -it postgres psql -U postgres -c 'select count(*) from price_aggregate;'
```

## Configuration

The producer can be configured via environment variables set in the `compose.yml` file.

- `CONSUMER_TOPIC` - The name of the kafka topic to consume messages from.
- `CONSUMER_GROUP_ID` - The group id to use when connecting to kafka.
- `CONSUMER_WINDOW_TIME_MS` - The size of the window to aggregate data from (in milliseconds).
- `PGHOST` - The name of the postgres host to connect to.
- `PGUSER` - The username to connect to postgres as.
- `PGPASSWORD` - The password to use when connecting to postgres.
