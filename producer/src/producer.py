import os
import time
from confluent_kafka import Producer
from stock_price import random_price_change

topic = os.environ.get('PRODUCER_TOPIC', 'stock_price_changes')
delay = float(os.environ.get("PRODUCER_DELAY", "1"))

producer = Producer({"bootstrap.servers": "kafka:9092"})

def stream():
    while True:
        update = random_price_change()
        producer.produce(topic, key=update[0], value=str(update[1]))
        time.sleep(delay)

stream()
