from psycopg2 import connect

# wrapper around a psycopg2 connection
class DbConnection(object):
    def __init__(self):
        self._connection = connect('')
        self._connection.autocommit = True
        self._cursor = self._connection.cursor()
    
    def query(self, query, params = None):
        return self._cursor.execute(query, params)

    def __del__(self):
        self._cursor.close()
        self._connection.close()


connection = DbConnection()


# save the price event to the database
def save_price_event(event):
    print('saving price change: {}'.format(event))
    connection.query("INSERT INTO price_changes (ticker, price) VALUES (%s, %s)", tuple(event))