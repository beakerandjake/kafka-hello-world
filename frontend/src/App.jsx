import { useEffect, useState } from "react";
import { PageHeading } from "./components/PageHeading";
import { StockCard } from "./components/StockCard";
import { StockDetail } from "./components/StockDetail";
import { addMinutes, set } from "date-fns";

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
  const [selectedStockIndex, setSelectedStockIndex] = useState(0);
  const [priceData, setPriceData] = useState(generateData());

  // load stocks
  useEffect(() => {
    const fetchStocks = async () => {
      const response = await fetch("http://localhost:3000/stocks");
      const parsed = await response.json();
      setStocks(parsed);
    };
    fetchStocks();
  }, []);

  if (!stocks.length) {
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
