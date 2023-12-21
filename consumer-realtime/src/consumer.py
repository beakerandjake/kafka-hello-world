"""
Kafka consumer which feeds stock price changes into the database 
"""
import signal
import os
import json
import sys
from confluent_kafka import Consumer
from save_price_change import save_price_change

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
            print("error consuming message: {}".format(message.error()))
            continue

        value = json.loads(message.value().decode("utf-8"))
        print("consumed message: {}".format(value))
        save_price_change(value)
finally:
    consumer.close()
