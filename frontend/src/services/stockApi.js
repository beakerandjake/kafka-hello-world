// hit localhost when developing locally
const API_ENDPOINT = import.meta.env.PROD ? "/api" : "http://localhost:3000";

/**
 * Returns the latest price data for the stock.
 */
export const getPriceData = async (ticker) => {
  const response = await fetch(`${API_ENDPOINT}/stocks/${ticker}/price`);
  return await response.json();
};

/**
 * Returns the available stocks.
 */
export const getStocks = async () => {
  const response = await fetch(`${API_ENDPOINT}/stocks`);
  return await response.json();
};
