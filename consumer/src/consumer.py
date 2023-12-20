import os
import signal
import json
from confluent_kafka import Consumer, KafkaException
from save_price_change import save_price_change

running = True

def shutdown(signal, frame):
    global running
    running = False

if __name__ == "__main__":
    signal.signal(signal.SIGTERM, shutdown)
    topic = os.environ['CONSUMER_TOPIC']
    print("connecting to kafka")
    consumer = Consumer({"bootstrap.servers": 'kafka:9092', "group.id": "stock_prices"})
    consumer.subscribe([topic])
    print("consuming messages on topic: {}".format(topic))
    try:
        while running:
            message = consumer.poll(timeout=1.0)
            if message is None:
                print('waiting for message')
                continue
            if message.error():
                raise KafkaException(message.error)
            value = json.loads(message.value().decode('utf-8'))
            print('consumed message: {}'.format(value))
            save_price_change(value)
    finally:
        consumer.close()
