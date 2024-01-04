const percentChange = (openPrice, latestPrice) => {
  return ((latestPrice - openPrice) / openPrice) * 100;
};

export const stocksReducer = (stocks, action) => {
  switch (action.type) {
    case "loaded":
      // console.log("stock loaded", action.stocks);
      return action.stocks.map((x) => ({
        ...x,
        percentChange: percentChange(x.openPrice, x.latestPrice || 0),
      }));
    case "price_change":
      // console.log("price change", action);
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
