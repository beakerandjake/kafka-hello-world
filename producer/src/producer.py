import os
import time
import signal
import sys
import json
from confluent_kafka import Producer
from stock_price import random_price_change

def shutdown(signal, frame):
    sys.exit()

if __name__ == "__main__":
    signal.signal(signal.SIGTERM, shutdown)
    delay = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0
    topic = os.environ['PRODUCER_TOPIC']
    print("connecting to kafka")
    producer = Producer({"bootstrap.servers": 'kafka:9092'})
    while True:
        change = random_price_change()
        print('producing: {} to topic: {}'.format(change, topic))
        producer.produce(topic, key=change[0], value=json.dumps(change))
        time.sleep(delay)
