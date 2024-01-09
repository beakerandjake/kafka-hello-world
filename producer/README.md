# producer

A kafka producer which continually publishes stock price change events to a kafka topic.

Built with confluent_kafka and psycopg2.

## Usage

This application depends on the kafka and postgres containers existing, and is intended to be ran through docker compose.

At the root of the repo run:

```
docker compose up
```

After all the containers have started up you can verify it is producing by viewing the logs:

```
docker logs producer --follow
```

Or you can subscribe to the topic in the command line:

```
docker exec -it kafka kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic stock_price_changes
```

## Configuration

The producer can be configured via environment variables set in the `compose.yml` file.

- `PRODUCER_SPEED_MS` - General amount of time to wait between publishing events (actual time is randomized from this value).
- `PRODUCER_TOPIC` - The kafka topic to publish messages to.
- `PGHOST` - The name of the postgres host to connect to.
- `PGUSER` - The username to connect to postgres as.
- `PGPASSWORD` - The password to use when connecting to postgres.
