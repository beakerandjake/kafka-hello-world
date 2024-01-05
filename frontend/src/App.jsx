import { useEffect, useState } from "react";
import { PageHeading } from "./components/PageHeading";
import { addMinutes, set } from "date-fns";
import { getStocks, getPrices, getPriceHistory } from "./services/stockApi";
import { TickerBar } from "./components/TickerBar";
import { StockDetailCard } from "./components/StockDetailCard";
import { PriceChart } from "./components/PriceChart";
import { PriceDetail } from "./components/PriceDetail";
import { useRealtimePrices } from "./hooks/useRealtimePrices";

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
  const [prices, setPrices] = useState({});
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const priceUpdate = useRealtimePrices();

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
      setSelected(stocks[0].ticker);
    });
  }, []);

  // update prices whenever a realtime change is pushed to us
  useEffect(() => {
    if (!priceUpdate) {
      return;
    }
    const { ticker, price } = priceUpdate;
    setPrices((prev) => ({
      ...prev,
      [ticker]: { ...prev[ticker], latest: price },
    }));
  }, [priceUpdate]);

  useEffect(() => {
    if (!priceUpdate) {
      return;
    }

    if (priceUpdate.ticker === selected) {
      const data = { x: priceUpdate.date.getTime(), y: priceUpdate.price };
      setHistory((prev) => [...prev, data]);
    }
  }, [priceUpdate, selected]);

  // load chart data when stock is selected
  useEffect(() => {
    let ignore = false;
    getPriceHistory(selected).then((result) => {
      if (!ignore) {
        setHistory(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [selected]);

  if (!stocks?.length) {
    return;
  }

  const stock = stocks.find(({ ticker }) => ticker === selected);
  const price = prices[stock.ticker];

  return (
    <div className="min-h-full">
      <PageHeading />
      <main>
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <TickerBar
            stocks={stocks}
            prices={prices}
            selected={selected}
            onSelect={setSelected}
          />
          <StockDetailCard name={stock.name}>
            <PriceDetail openPrice={price.open} latestPrice={price.latest} />
            <PriceChart
              priceData={history}
              openPrice={price.open}
              latestPrice={price.latest}
            />
          </StockDetailCard>
        </div>
      </main>
    </div>
  );
}

export default App;
