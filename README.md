# kafka-hello-world

Simple Kafka streaming

## Run

```
docker compose up -d
```

## Console Consumer

```
docker exec -it kafka  kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic stock_price_changes
```

## CLI into Postgres
```
docker exec -it postgres psql -U postgres
```

## execute dotnet command 
```
docker run --rm -it -v ${pwd}:/app/ -w /app mcr.microsoft.com/dotnet/sdk:8.0 dotnet COMMAND
```