# database

This directory contains sql files which initialize the postgres database.

`create.sql` creates the tables required by the application.

`insert.sql` seeds the database with hardcoded price data to ensure the frontend has pretty graphs on start up. Data is inserted with timestamps to simulate the application having been running from some time before start up.

## Usage

The `compose.yml` file copies the `create.sql` and the `insert.sql` files into the postgres containers `/docker-entrypoint-initdb.d/` directory. The postgres container runs these scrips on startup.
