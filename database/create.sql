CREATE TABLE price_changes (
    ticker TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    event_date TIMESTAMP NOT NULL
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    ticker TEXT NOT NULL,
    full_name TEXT NOT NULL, 
    price DECIMAL(12,2) NOT NULL,
    volatility DECIMAL(3, 2)
);