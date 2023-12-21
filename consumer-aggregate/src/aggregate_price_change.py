from datetime import datetime
from psycopg2 import connect

# connection = connect('')
# connection.autocommit = True
# cursor = connection.cursor()

history = {}


def aggregate_price_change(event):
    """aggregates and stores the price change event"""

    if "ticker" not in event or "price" not in event or "date" not in event:
        print("could not parse message: {}".format(event))
        return

    if event["ticker"] not in history:
        print("put: {}".format(event["ticker"]))
        history[event["ticker"]] = datetime.fromisoformat(event["date"])
        return
    
    delta = datetime.fromisoformat(event["date"]) - history[event["ticker"]]
    print("tick: {}, delta: {}".format(event["ticker"], delta))

