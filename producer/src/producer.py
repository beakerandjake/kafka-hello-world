import os
import time
from confluent_kafka import Producer
from stock_price import random_price_change

delay = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0

producer = Producer({"bootstrap.servers": 'kafka:9092'})

# continually stream stock price changes to kafka
def stream():
    while True:
        update = random_price_change()
        producer.produce("stock_price_changes", key=update[0], value=str(update[1]))
        time.sleep(delay)

stream()
