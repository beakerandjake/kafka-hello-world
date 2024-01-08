INSERT INTO stocks (ticker, full_name, open_price, volatility) 
VALUES 
    ('CATS', 'Sleepy Cat, Inc.', 486.01, 0.0009),
    ('DOG', 'Good Dog Corporation', 144.66, 0.0005),
    ('COOL', 'One Cool Company, Inc.', 55.95, 0.0002),
    ('FUN', 'Fun Time Corp.', 98.95, 0.001),
    ('ICE', 'Snow Cold Drinks Company Limited', 325.95, 0.0004);



-- insert price_aggregate / price_change rows for each ticker with timestamps from 180 minutes ago until now
-- this will make the chart on the frontend have enough data to look interesting 
DO $$
DECLARE price_start_time TIMESTAMP;
BEGIN
    -- price_start_time = date_trunc('second', NOW() - INTERVAL '180 minute');
    price_start_time = date_trunc('second', NOW());

    

    WITH changes (ticker, open_price, close_price, max_price, min_price) AS (
        VALUES
        ('CATS', 486.01, 486.11, 486.46, 484.61),
        ('CATS', 486.38, 485.18, 486.48, 484.21),
        ('CATS', 486.38, 485.18, 486.48, 484.21),
        ('DOGS', 486.01, 486.11, 486.46, 484.61),
        ('DOGS', 486.38, 485.18, 486.48, 484.21),
        ('DOGS', 486.38, 485.18, 486.48, 484.21)
    )

    INSERT INTO price_aggregate (ticker, start_date, end_date, open_price, close_price, max_price, min_price)
    SELECT
        ticker, 
        date_trunc('minute', price_start_time + INTERVAL '1 minute' * rn) as start_time,
        date_trunc('minute', price_start_time + INTERVAL '1 minute' * (rn + 1)) as end_time,
        open_price, 
        close_price, 
        max_price, 
        min_price
    FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY ticker) - 1 as rn FROM changes
    );
END $$;