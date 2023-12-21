import os
from datetime import datetime, timedelta
from psycopg2 import connect

window_time = float(os.environ["CONSUMER_WINDOW_TIME_MS"])

# connection = connect('')
# connection.autocommit = True
# cursor = connection.cursor()

history = {}


def save_aggregate(event):
    """creates an aggregate row for the stock"""
    print(f"aggregate update: {event}")


def aggregate_price_change(event):
    """aggregates and stores the price change event"""

    if "ticker" not in event or "price" not in event or "date" not in event:
        print("could not parse message: {}".format(event))
        return

    if event["ticker"] not in history:
        print(f"put: {event['ticker']}")
        history[event["ticker"]] = datetime.fromisoformat(event["date"])
        return

    delta = datetime.fromisoformat(event["date"]) - history[event["ticker"]]
    if delta.total_seconds() * 1000 > window_time:
        save_aggregate(event)
        history[event["ticker"]] = datetime.fromisoformat(event["date"])
