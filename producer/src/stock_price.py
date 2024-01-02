"""
Simulates stock price changes
"""
import datetime
import random
import psycopg2

connection = psycopg2.connect("")
connection.autocommit = True
cursor = connection.cursor()


def load_stocks():
    """returns an array of stocks"""
    cursor.execute("SELECT ticker, price, volatility FROM stocks")
    raw = cursor.fetchall()
    mapped = map(
        lambda s: {"ticker": s[0], "price": float(s[1]), "volatility": float(s[2])}, raw
    )
    return list(mapped)


# maintain stock updates in memory for demo
stocks = load_stocks()


def _get_new_price(stock):
    """simulate a stock price change: https://stackoverflow.com/a/8597889"""
    change_percent = 2 * stock["volatility"] * random.random()
    if change_percent > stock["volatility"]:
        change_percent -= 2 * stock["volatility"]
    change_amount = stock["price"] * change_percent
    return max(1, round(stock["price"] + change_amount, 2))


def map_stock(stock):
    """return an array representing the price change for the stock"""
    ticker = stock["ticker"]
    price = stock["price"]
    now = datetime.datetime.now(tz=datetime.timezone.utc).isoformat()
    return {"ticker": ticker, "price": price, "date": now}


def get_price_changes():
    """returns the new prices of the stocks"""
    for i, stock in enumerate(stocks):
        stocks[i]["price"] = _get_new_price(stock)
    return list(map(map_stock, stocks))
