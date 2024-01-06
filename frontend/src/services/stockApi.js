// hit localhost when developing locally
export const API_ENDPOINT = import.meta.env.PROD ? "/api" : "http://localhost:3000";

/**
 * Returns the latest price data for the stock.
 */
export const getPrice = async (ticker) => {
  const response = await fetch(`${API_ENDPOINT}/stocks/${ticker}/price`);
  return await response.json();
};

/**
 * Returns the latest prices of the stocks.
 */
export const getPrices = async (tickers) => {
  const prices = await Promise.all(tickers.map((ticker) => getPrice(ticker)));
  return prices.reduce((acc, { ticker, ...rest }) => {
    acc[ticker] = rest;
    return acc;
  }, {});
};

/**
 * Returns historical price data.
 */
export const getPriceHistory = async (ticker) => {
  const response = await fetch(`${API_ENDPOINT}/stocks/${ticker}/history`);
  const raw = await response.json();
  return raw.map(({ date, price }) => ({ x: date, y: price }));
};

/**
 * Returns the available stocks.
 */
export const getStocks = async () => {
  const response = await fetch(`${API_ENDPOINT}/stocks`);
  return await response.json();
};
