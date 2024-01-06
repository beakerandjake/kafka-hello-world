"""
Kafka producer which sends stock price change events
"""
import os
import time
import signal
import sys
import json
import random
from datetime import datetime, timezone
import confluent_kafka
import stock_price
import seed_database
from util import randomize_delay


def shutdown(signal, frame):
    sys.exit()


def map_message(price_change):
    "maps a price change event to a message which will be published to kafka"
    return price_change | {"date": datetime.now(tz=timezone.utc).isoformat()}


def produce():
    "continually produce stock price changes to kafka"
    sleep_ms = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0
    topic = os.environ["PRODUCER_TOPIC"]
    print("connecting to kafka")
    producer = confluent_kafka.Producer({"bootstrap.servers": "kafka:9092"})
    while True:
        changes = stock_price.get_new_prices()
        random.shuffle(changes)
        for change in changes:
            message = map_message(change)
            print("producing: {} to topic: {}".format(message, topic))
            producer.produce(topic, key=message["ticker"], value=json.dumps(message))
            time.sleep(randomize_delay(sleep_ms))


if __name__ == "__main__":
    signal.signal(signal.SIGTERM, shutdown)
    seed_database.seed()
    produce()
