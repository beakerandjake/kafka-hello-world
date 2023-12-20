from psycopg2 import connect

# save the price event to the database
def save_price_event(event):
    print('saving price change: {}'.format(event))
    with connect('') as connection:
        with connection.cursor() as cursor:
            query = "INSERT INTO price_changes (ticker, price) VALUES (%s, %s)"
            args = tuple(event)
            cursor.execute(query, args)