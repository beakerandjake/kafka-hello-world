import { useEffect, useState, useReducer } from "react";
import { PageHeading } from "./components/PageHeading";
import { StockCard } from "./components/StockCard";
import { StockDetail } from "./components/StockDetail";
import { addMinutes, set } from "date-fns";
import { stocksReducer } from "./reducers/stocksReducer";

const priceChange = (timestamp, price) => {
  const nextDate = addMinutes(new Date(timestamp), 2);
  const positive = Math.random() > 0.5;
  const amount = Math.random() * 10 * (positive ? 1 : -1);
  const newPrice = Math.max(0, price + amount);
  return {
    x: nextDate.getTime(),
    y: newPrice,
  };
};

const generateData = () => {
  const data = [];
  let price = 43.29;
  let timestamp = set(new Date(), { hours: 9, minutes: 30 }).getTime();
  let amount = 145; // 390
  for (let i = 0; i < amount; i++) {
    const change = priceChange(timestamp, price);
    timestamp = change.x;
    price = change.y;
    data.push(change);
  }
  return data;
};

function App() {
  const [stocks, dispatch] = useReducer(stocksReducer, []);
  const [selectedStockIndex, setSelectedStockIndex] = useState(0);
  const [priceData, setPriceData] = useState(generateData());

  // load stocks
  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch(`/api/stocks`);
      dispatch({
        type: "loaded",
        stocks: await response.json(),
      });
    };
    fetchStocks();
  }, []);

  // sse price change events
  useEffect(() => {
    const sse = new EventSource(`/api/stocks/realtime`);

    sse.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      dispatch({ type: "price_change", ...parsed });
    };

    sse.onerror = (error) => {
      console.error("SSE Event Source failed:", error);
    };

    return () => {
      sse.close();
    };
  }, []);

  if (!stocks?.length) {
    return <p>Loading...</p>;
  }

  const onStockSelected = (index) => {
    setPriceData(generateData());
    setSelectedStockIndex(index);
  };

  return (
    <div className="min-h-full">
      <PageHeading />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex w-full items-center gap-3  overflow-hidden overflow-x-auto pb-6">
            {stocks.map((stock, index) => (
              <StockCard
                key={stock.ticker}
                {...stock}
                isSelected={index === selectedStockIndex}
                onClick={() => onStockSelected(index)}
              />
            ))}
          </div>
          <div className="mt-5">
            <StockDetail
              key={selectedStockIndex}
              {...stocks[selectedStockIndex]}
              priceData={priceData}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
