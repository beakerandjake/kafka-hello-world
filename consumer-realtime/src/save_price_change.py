"""
Saves price change events to the database
"""
from psycopg2 import connect

connection = connect("")
connection.autocommit = True
cursor = connection.cursor()


def save_price_change(event):
    """save the price event to the database"""

    if "ticker" not in event or "price" not in event or "date" not in event:
        print("could not parse message: {}".format(event))
        return

    print("saving price change: {}".format(event))
    query = "INSERT INTO price_changes (ticker, price, event_date) VALUES (%s, %s, %s)"
    args = (event["ticker"], event["price"], event["date"])
    cursor.execute(query, args)
