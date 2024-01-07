"""
Seeds the database with "historical" price_change rows. 
"""
from datetime import datetime, timedelta, timezone, time
import os
import itertools
import psycopg2
from psycopg2.extras import execute_batch
import stock_price
from util import randomize_delay

minutes_to_seed = float(os.getenv("PRODUCER_SEED_MINUTES", 0))
delay_ms = float(os.environ.get("PRODUCER_SPEED_MS", 1000))

print("minutes_to_seed", minutes_to_seed)
print("delay_ms", delay_ms)

connection = psycopg2.connect("")
connection.autocommit = True
cursor = connection.cursor()


def truncate():
    """truncates the price_changes and price_aggregate tables"""
    cursor.execute("truncate price_changes")
    cursor.execute("truncate price_aggregate")


def get_price_changes(ticker, start_time, end_time):
    """returns a list of price changes from start time to end time"""
    current_time = start_time
    price_changes = [
        {"price": stock_price.get_current_price(ticker), "timestamp": current_time}
    ]
    while current_time < end_time:
        current_time = current_time + timedelta(milliseconds=randomize_delay(delay_ms))
        price_changes.append(
            {
                "price": stock_price.get_new_price(ticker),
                "timestamp": current_time,
            }
        )
    return price_changes


def save_price_changes(ticker, price_changes):
    """saves the tickers price changes to the database"""
    execute_batch(
        cursor,
        "INSERT INTO price_changes (ticker, price, event_date) VALUES (%s, %s, %s)",
        tuple(
            map(
                lambda x: (ticker, x["price"], x["timestamp"].isoformat()),
                price_changes,
            )
        ),
    )


def minute_range(timestamp):
    """returns an array containing the start and end datetimes of timestamp's minute"""
    start = datetime.combine(timestamp, time.min)
    end = datetime.combine(timestamp, time.max)
    return [
        start.replace(hour=timestamp.hour, minute=timestamp.minute),
        end.replace(hour=timestamp.hour, minute=timestamp.minute),
    ]


def aggregate_price_changes(ticker, price_changes):
    """aggregates the price changes minute by minute"""
    aggregated = []
    groupByMinute = lambda x: x["timestamp"].strftime("%H %M")
    for k, g in itertools.groupby(price_changes, groupByMinute):
        changes = list(g)
        time_range = minute_range(changes[0]["timestamp"])
        prices = list(map(lambda x: x["price"], changes))
        aggregated.append(
            (
                ticker,
                time_range[0].isoformat(),
                time_range[1].isoformat(),
                changes[0]["price"],
                changes[-1]["price"],
                max(prices),
                min(prices),
            )
        )
    return aggregated


def save_price_aggregates(ticker, price_changes):
    """aggregates the tickers price changes and saves to the database"""
    execute_batch(
        cursor,
        (
            "INSERT INTO price_aggregate (ticker, start_date, end_date, open_price, close_price, max_price, min_price)"
            "VALUES (%s,%s,%s,%s,%s,%s,%s);"
        ),
        aggregate_price_changes(ticker, price_changes),
    )


def seed():
    """seeds the price_changes and price_aggregate table with "historic" data"""
    if minutes_to_seed <= 0:
        print("skipping seed because PRODUCER_SEED_MINUTES <= 0")
        return

    # reset db on start to ease local development
    truncate()

    # seed price changes for each stock
    end_time = datetime.now(tz=timezone.utc)
    start_time = end_time - timedelta(minutes=minutes_to_seed)
    for ticker in stock_price.get_tickers():
        print("seeding stock:", ticker, "from:", start_time, "to:", end_time)
        price_changes = get_price_changes(ticker, start_time, end_time)
        save_price_changes(ticker, price_changes)
        save_price_aggregates(ticker, price_changes)
