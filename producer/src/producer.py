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
import price_simulator


def shutdown(signal, frame):
    sys.exit()


def map_message(price_change):
    "maps a price change event to a message which will be published to kafka"
    return price_change | {"timestamp": datetime.now(tz=timezone.utc).isoformat()}


if __name__ == "__main__":
    signal.signal(signal.SIGTERM, shutdown)
    delay_seconds = float(os.environ.get("PRODUCER_SPEED_MS", "1000")) / 1000.0
    topic = os.environ["PRODUCER_TOPIC"]
    print("connecting to kafka")
    producer = confluent_kafka.Producer({"bootstrap.servers": "kafka:9092"})
    while True:
        changes = price_simulator.get_new_prices()
        random.shuffle(changes)
        for change in changes:
            message = map_message(change)
            print("producing: {} to topic: {}".format(message, topic))
            producer.produce(topic, key=message["ticker"], value=json.dumps(message))
            time.sleep(
                random.uniform(
                    delay_seconds - (delay_seconds / 2),
                    delay_seconds + (delay_seconds / 2),
                )
            )
