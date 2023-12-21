import signal
import os
import json
import sys
from confluent_kafka import Consumer
from aggregate_price_change import aggregate_price_change

# no need to gracefully exit for demo, just quit.
signal.signal(signal.SIGTERM, lambda a, b: sys.exit())

consumer = Consumer(
    {"bootstrap.servers": "kafka:9092", "group.id": os.environ["CONSUMER_GROUP_ID"]}
)

consumer.subscribe([os.environ["CONSUMER_TOPIC"]])

try:
    while True:
        message = consumer.poll(timeout=1.0)

        if message is None:
            continue
        if message.error():
            print(f"error consuming message: {message.error()}")
            continue

        value = json.loads(message.value().decode("utf-8"))
        print(f"consumed message: {value}")
        aggregate_price_change(value)
finally:
    consumer.close()
