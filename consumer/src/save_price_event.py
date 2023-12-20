from psycopg2 import connect

connection = connect('')
connection.autocommit = True
cursor = connection.cursor()

# save the price event to the database
def save_price_event(event):
    print('saving price change: {}'.format(event))
    cursor.execute("INSERT INTO price_changes (ticker, price) VALUES (%s, %s)", tuple(event))