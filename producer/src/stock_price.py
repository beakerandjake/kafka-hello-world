import random
import psycopg2

connection = psycopg2.connect('')
connection.autocommit = True
cursor = connection.cursor()

# returns an array of stocks.
def load_stocks():
    cursor.execute("SELECT ticker, price, volatility FROM stocks")
    raw = cursor.fetchall()
    mapped = map(lambda s: {'ticker': s[0], 'price': float(s[1]), 'volatility': float(s[2])}, raw)
    return list(mapped)

# maintain stock updates in memory for demo
stocks = load_stocks()

# simulate a stock price change: https://stackoverflow.com/a/8597889
def _get_new_price(stock):
    change_percent = 2 * stock['volatility'] * random.random()
    if(change_percent > stock['volatility']):
        change_percent -= (2 * stock['volatility'])
    change_amount = stock['price'] * change_percent;
    return max(0.0, round(stock['price'] + change_amount, 2))

# returns the new prices of the stocks
def get_price_changes():
    for i, stock in enumerate(stocks):
        stocks[i]['price'] = _get_new_price(stock)
    return list(map(lambda s: [s['ticker'], s['price']], stocks))