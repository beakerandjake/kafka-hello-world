import os
import time
import signal
import sys
import json
import confluent_kafka
import stock_price


def shutdown(signal, frame):
    sys.exit()


if __name__ == "__main__":
    signal.signal(signal.SIGTERM, shutdown)
    delay = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0
    topic = os.environ['PRODUCER_TOPIC']
    print("connecting to kafka")
    producer = confluent_kafka.Producer({"bootstrap.servers": 'kafka:9092'})
    while True:
        changes = stock_price.get_price_changes()
        for change in changes:
            print('producing: {} to topic: {}'.format(change, topic))
            producer.produce(topic, key=change['ticker'], value=json.dumps(change))
            time.sleep(delay)
