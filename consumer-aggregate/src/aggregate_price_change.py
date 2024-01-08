"""
Aggregates price changes into buckets. 
Performs simple aggregation in memory to demonstrate consuming a stream of kafka data. 
"""
import os
from datetime import datetime, timedelta, timezone, time
from psycopg2 import connect

window_time_seconds = float(os.environ["CONSUMER_WINDOW_TIME_MS"]) / 1000.0

connection = connect("")
connection.autocommit = True
cursor = connection.cursor()


def initialize():
    """loads the last price change times for each stock"""
    cursor.execute("SELECT ticker, MAX(event_date) FROM price_changes GROUP BY ticker")
    return dict(
        map(lambda x: (x[0], x[1].replace(tzinfo=timezone.utc)), cursor.fetchall())
    )


cache = initialize()

print("initialized cache", cache)


def parse_timestamp(event):
    """returns the datetime of the event"""
    return datetime.fromisoformat(event["timestamp"])


def entered_new_window(ticker, timestamp):
    """returns true if the price change of the stock falls after the stocks current window"""
    delta = timestamp - cache[ticker]
    return delta.total_seconds() >= window_time_seconds


def window_start(timestamp):
    """returns the a new datetime representing the inclusive start time of the window"""
    return datetime.combine(timestamp, time.min).replace(
        hour=timestamp.hour, minute=timestamp.minute
    )


def window_end(start):
    """returns a new datetime representing the exclusive end time of the window"""
    return start + timedelta(seconds=window_time_seconds)


def save_aggregate(ticker, timestamp):
    """creates an aggregate row for the stock"""
    start = window_start(timestamp)
    end = window_end(start)
    print(f"aggregating: {ticker} from: {start} to {end}")
    query = """
        INSERT INTO price_aggregate (ticker, start_date, end_date, open_price, close_price, max_price, min_price)
        SELECT DISTINCT
            %(ticker)s,
            %(start)s,
            %(end)s,
            FIRST_VALUE(price) OVER date_asc AS open_price,
            FIRST_VALUE(price) OVER date_desc AS close_price,
            MAX(price) OVER () as max_price,
            MIN(price) OVER () as min_price
        FROM price_changes
        WHERE ticker = %(ticker)s
            AND event_date >= timestamp %(start)s
            AND event_date < timestamp %(end)s
        WINDOW
            date_asc AS (ORDER BY event_date ASC),
            date_desc AS (ORDER BY event_date DESC)
    """
    cursor.execute(query, {"ticker": ticker, "start": start, "end": end})


def aggregate_price_change(event):
    """aggregates and stores the price change event"""
    if "ticker" not in event or "price" not in event or "timestamp" not in event:
        print("could not parse message: {}".format(event))
        return
    if event["ticker"] not in cache:
        print("unknown ticker: {}".format(event["ticker"]))
        return
    timestamp = parse_timestamp(event)
    if entered_new_window(event["ticker"], timestamp) is True:
        save_aggregate(event["ticker"], timestamp)
        cache[event["ticker"]] = timestamp
        print("{}: new window end: {}".format(event["ticker"], cache[event["ticker"]]))
