import time
import stock_price

def stream():
    while True:
        print(stock_price.random_price_change())
        time.sleep(1)

stream()
