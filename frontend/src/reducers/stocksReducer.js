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
    default:
      throw Error(`Unknown action: ${action}`);
  }
};
