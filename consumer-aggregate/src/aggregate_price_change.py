"""
Aggregates price changes into buckets. 
Performs simple aggregation in memory to demonstrate consuming a stream of kafka data. 
"""
import os
from datetime import datetime, timedelta
from psycopg2 import connect

window_time = float(os.environ["CONSUMER_WINDOW_TIME_MS"])

connection = connect("")
connection.autocommit = True
cursor = connection.cursor()

history = {}


def parse_timestamp(event):
    """returns the datetime of the event"""
    return datetime.fromisoformat(event["timestamp"])


def save_aggregate(ticker, stream):
    """creates an aggregate row for the stock"""
    print(f"saving aggregate for: {ticker}, num price changes: {len(stream)}")
    prices = list(map(lambda x: x["price"], stream))
    query = (
        "INSERT INTO price_aggregate (ticker, start_date, end_date, open_price, close_price, max_price, min_price)"
        "VALUES (%s,%s,%s,%s,%s,%s,%s);"
    )
    args = [
        ticker,
        stream[0]["timestamp"],
        stream[-1]["timestamp"],
        stream[0]["price"],
        stream[-1]["price"],
        max(prices),
        min(prices),
    ]
    cursor.execute(query, args)


def aggregate_price_change(event):
    """aggregates and stores the price change event"""

    if "ticker" not in event or "price" not in event or "timestamp" not in event:
        print("could not parse message: {}".format(event))
        return

    if event["ticker"] in history:
        stream = history[event["ticker"]]
        stream.append(event)
        delta = parse_timestamp(event) - parse_timestamp(stream[0])
        if delta.total_seconds() * 1000 > window_time:
            save_aggregate(event["ticker"], stream)
            history[event["ticker"]] = []
    else:
        history[event["ticker"]] = [event]
