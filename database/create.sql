CREATE TABLE price_changes (
    ticker TEXT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    ticker TEXT NOT NULL,
    full_name TEXT NOT NULL, 
    price DECIMAL(12,2) NOT NULL,
    volatility DECIMAL(3, 2)
);