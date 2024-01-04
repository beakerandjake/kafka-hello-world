import { useEffect, useState } from "react";
import { PageHeading } from "./components/PageHeading";
import { TickerCard } from "./components/TickerCard";
import { StockDetail } from "./components/StockDetail";
import { addMinutes, set } from "date-fns";
import { getStocks, getPrices } from "./services/stockApi";
import { TickerBar } from "./components/TickerBar";

const calculatePercentChange = (openPrice, latestPrice) => {
  return ((latestPrice - openPrice) / openPrice) * 100;
};

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
  const [stocks, setStocks] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selected, setSelected] = useState(null);

  const [selectedStockIndex, setSelectedStockIndex] = useState(0);
  const [priceData, setPriceData] = useState(generateData());

  // get basic stock data on init.
  useEffect(() => {
    const loadInitialData = async () => {
      const stocks = await getStocks();
      const prices = await getPrices(stocks.map(({ ticker }) => ticker));
      return { stocks, prices };
    };

    loadInitialData().then(({ stocks, prices }) => {
      console.log("stocks", stocks);
      console.log("prices", prices);
      setStocks(stocks);
      setPrices(prices);
    });
  }, []);

  // sse price change events
  // useEffect(() => {
  //   const sse = new EventSource(`${API_ENDPOINT}/stocks/realtime`);

  //   sse.onmessage = (event) => {
  //     const parsed = JSON.parse(event.data);
  //     dispatch({ type: "price_change", ...parsed });
  //   };

  //   sse.onerror = (error) => {
  //     console.error("SSE Event Source failed:", error);
  //   };

  //   return () => {
  //     sse.close();
  //   };
  // }, []);

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
          <TickerBar
            stocks={stocks}
            prices={prices}
            selected={selected}
            onSelect={setSelected}
          />
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
