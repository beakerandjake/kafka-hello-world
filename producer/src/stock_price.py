import json
import random

# load the stocks
with open('data.json', 'r') as contents:
    stocks = json.load(contents, )

# simulate a stock price change: https://stackoverflow.com/a/8597889
def _get_new_price(stock):
    change_percent = 2 * stock['volatility'] * random.random()
    if(change_percent > stock['volatility']):
        change_percent -= (2 * stock['volatility'])
    change_amount = stock['price'] * change_percent;
    return round(stock['price'] + change_amount, 2)

# updates the price of a random stock. 
def random_price_change():
    stock = random.choice(stocks)
    new_price = _get_new_price(stock)
    # print('{}: {} -> {}'.format(stock['id'], stock['price'], new_price))
    stock['price'] = new_price
    return [stock['id'], stock['price']]