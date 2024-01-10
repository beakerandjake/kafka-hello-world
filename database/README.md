# database

This directory contains sql files which initialize a postgres database.

`create.sql` creates the tables required by the application.

`insert.sql` seeds the database with hardcoded price data to ensure the frontend has pretty graphs on start up. Data is inserted with timestamps to simulate the application having been running from some time before start up.

## Tables

### stocks

Contains basic information about the stocks which the program will update prices for.

### price_changes

Stores price change events. These events published by the producer application, routed to consumer-realtime application via kafka and then saved to this table.

### price_aggregate

Stores aggregated data from the `price_changes` table. The consumer-aggregate application will insert rows into this table aggregating each minute (by default) of price changes for each stock.


## Usage

This application is intended to be ran through docker compose.

At the root of the repo run:

```sh
docker compose up -d
```

The `compose.yml` file copies the `create.sql` and the `insert.sql` files into the postgres containers `/docker-entrypoint-initdb.d/` directory. The postgres container runs these scrips on startup.

### Execute Commands Interactively
To connect to the postgres container and execute commands interactively: 

```
docker exec -it postgres psql -U postgres
```

### Execute Single Command

To connect to the postgres container and execute a single command: 

```
docker exec -it postgres psql -U postgres -c <COMMAND TEXT HERE>
```

Example: 

```
docker exec -it postgres psql -U postgres -c 'select * from stocks;'
```