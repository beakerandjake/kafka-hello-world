# kafka-hello-world
Simple Kafka streaming

## Run 
```
docker compose up -d
```

## Console Consumer
```
docker exec -it kafka  kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic stock_price_changes --from-beginning

```