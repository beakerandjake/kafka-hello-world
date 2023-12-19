import json
import random

# load the stocks
with open('data.json', 'r') as contents:
    stocks = json.load(contents)

# updates the price of a random stock. 
# returns an array containing the stock id and the new price.
def update_price():
    stock = random.choice(stocks)
    # simulate a stock price change: https://stackoverflow.com/a/8597889
    change_percent = 2 * stock['volatility'] * random.random()
    if(change_percent > stock['volatility']):
        change_percent -= (2 * stock['volatility'])
    change_amount = stock['price'] * change_percent;
    stock['price'] = round(stock['price'] + change_amount, 2)
    return [stock['id'], stock['price']]

print(update_price())