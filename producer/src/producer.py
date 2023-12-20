import os
import time
import signal
import sys
from confluent_kafka import Producer
from stock_price import random_price_change

if __name__ == "__main__":
    signal.signal(signal.SIGTERM, lambda : sys.exit())
    delay = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0
    topic = os.environ['PRODUCER_TOPIC']
    producer = Producer({"bootstrap.servers": 'kafka:9092'})
    while True:
        change = random_price_change()
        producer.produce(topic, key=change[0], value=str(change))
        time.sleep(delay)
