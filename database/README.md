# database

This directory contains sql files which initialize the postgres database.

`insert.sql` seeds the database with hardcoded price data to ensure the frontend has pretty graphs on start up. Data is inserted with timestamps to simulate the application having been running from some time before start up.

## Usage

The `compose.yml` file places these scripts inside of the `/docker-entrypoint-initdb.d/` directory of the postgres container.

The postgres container runs any scripts in this directory on startup, this is how the database gets initialized.
