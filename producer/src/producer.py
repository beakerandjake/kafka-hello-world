import os
import time
from confluent_kafka import Producer
from stock_price import random_price_change

delay = float(os.environ.get("PRODUCER_DELAY", "1"))

def stream():
    while True:
        print(random_price_change())
        time.sleep(delay)

stream()
