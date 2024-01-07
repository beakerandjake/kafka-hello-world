"""
Simulates stock price changes
"""
import random
import psycopg2
from datetime import datetime, timezone

connection = psycopg2.connect("")
connection.autocommit = True
cursor = connection.cursor()


def load_stocks():
    """returns an dict of stocks, mapping ticker to current price"""
    cursor.execute("SELECT ticker, open_price, volatility FROM stocks")
    return dict(
        map(
            lambda x: [x[0], {"price": float(x[1]), "volatility": float(x[2])}],
            cursor.fetchall(),
        )
    )


# maintain stock prices in memory for demo
stocks = load_stocks()


def get_tickers():
    """returns a list of all stock tickers"""
    return list(stocks.keys())


def _simulate_price_change(price, volatility):
    """simulate a stock price change: https://stackoverflow.com/a/8597889"""
    change_percent = 2 * volatility * random.random()
    if change_percent > volatility:
        change_percent -= 2 * volatility
    change_amount = price * change_percent
    return max(1, round(price + change_amount, 2))


def get_current_price(ticker):
    """returns the current price of the stock"""
    return stocks[ticker]["price"]


def get_new_price(ticker):
    """updates the price of the stock and returns the new price"""
    new_price = _simulate_price_change(
        stocks[ticker]["price"], stocks[ticker]["volatility"]
    )
    stocks[ticker]["price"] = new_price
    return new_price


def get_new_prices():
    """updates the price of all stocks and returns the new prices"""
    return list(
        map(
            lambda ticker: {"ticker": ticker, "price": get_new_price(ticker)},
            stocks.keys(),
        )
    )
