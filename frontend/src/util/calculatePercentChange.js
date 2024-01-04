/**
 * Returns the percent that the stock has changed.
 * @param {number} openPrice
 * @param {number} latestPrice
 */
export const calculatePercentChange = (openPrice, latestPrice) => {
  if (Number.isNaN(openPrice) || Number.isNaN(latestPrice)) {
    return 0;
  }
  return ((latestPrice - openPrice) / openPrice) * 100;
};
