const percentChange = (openPrice, latestPrice) => {
  return openPrice / latestPrice;
};

export const stocksReducer = (stocks, action) => {
  switch (action.type) {
    case "loaded":
      return action.stocks.map((x) => ({
        ...x,
        percentChange: percentChange(x.openPrice, x.latestPrice),
      }));
    case "price_change":
      return stocks.map((x) =>
        x.ticker.toLowerCase() === action.ticker.toLowerCase()
          ? {
              ...x,
              latestPrice: action.price,
              percentChange: percentChange(x.openPrice, action.price),
            }
          : x,
      );
    default:
      throw Error(`Unknown action type: ${action?.type}`);
  }
};
