import { useEffect, useState } from "react";
import { PageHeading } from "./components/PageHeading";
import { PriceChart } from "./components/PriceChart";
import { PriceDetail } from "./components/PriceDetail";
import { StockDetailCard } from "./components/StockDetailCard";
import { TickerBar } from "./components/TickerBar";
import { useRealtimePrices } from "./hooks/useRealtimePrices";
import { getPrices, getStocks } from "./services/stockApi";

function App() {
  const [stocks, setStocks] = useState([]);
  const [prices, setPrices] = useState({});
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
      setStocks(stocks);
      setPrices(prices);
      setSelected(stocks[0].ticker);
    });
  }, []);

  // update latest prices whenever a realtime change is pushed to us
  useEffect(() => {
    if (!priceUpdate) {
      return;
    }
    const { ticker, date, price } = priceUpdate;
    setPrices((prev) => ({
      ...prev,
      [ticker]: { ...prev[ticker], latest: price, timestamp: date },
    }));
  }, [priceUpdate]);

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
              ticker={stock.ticker}
              priceData={price}
              priceDirection={Math.sign(price.latest - price.open)}
            />
          </StockDetailCard>
        </div>
      </main>
    </div>
  );
}

export default App;
