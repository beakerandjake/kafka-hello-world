import os
import time
import signal
import sys
from confluent_kafka import Producer
from stock_price import random_price_change

if __name__ == "__main__":
    signal.signal(signal.SIGTERM, lambda : sys.exit())
    producer = Producer({"bootstrap.servers": 'kafka:9092'})
    delay = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0
    while True:
        change = random_price_change()
        producer.produce("stock_price_changes", key=change[0], value=str(change))
        time.sleep(delay)
