import os
import signal
import sys
from confluent_kafka import Consumer

topic = os.environ['CONSUMER_TOPIC']
running = True

def shutdown():
    running = False

def consume_loop():
    try:
        print('consumer topic', topic)
        consumer = Consumer({"bootstrap.servers": 'kafka:9092', "group.id": "stock_prices"})
        consumer.subscribe([topic])
        print('subscribed')
    finally:
        consumer.close()


if __name__ == "__main__":
    signal.signal(signal.SIGTERM, shutdown)
    consume_loop()
