"""
Simulates stock price changes
"""
import random
import psycopg2

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


def _simulate_price_change(price, volatility):
    """simulate a stock price change: https://stackoverflow.com/a/8597889"""
    change_percent = 2 * volatility * random.random()
    if change_percent > volatility:
        change_percent -= 2 * volatility
    change_amount = price * change_percent
    new_price = price + change_amount
    if new_price < 5:
        new_price = price + abs(change_amount)
    return round(new_price, 2)


def _get_new_price(ticker):
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
            lambda ticker: {"ticker": ticker, "price": _get_new_price(ticker)},
            stocks.keys(),
        )
    )
