import { useState } from "react";
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

const stocks = [
  {
    id: 1,
    ticker: "FUN",
    name: "Fun Time Cool Company",
    price: 666.69,
    changePercent: -1.32,
  },
  {
    id: 2,
    ticker: "YUM",
    name: "Yummy Good Food LLC",
    price: 212.48,
    changePercent: 6.69,
  },
  {
    id: 3,
    ticker: "CAT",
    name: "Cat Corp",
    price: 420.69,
    changePercent: 4.38,
  },
  {
    id: 4,
    ticker: "DOG",
    name: "Doggy Brands",
    price: 13.98,
    changePercent: -2.39,
  },
];

function App() {
  const [selectedStockIndex, setSelectedStockIndex] = useState(0);
  const [priceData, setPriceData] = useState(generateData());

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
