import { PageHeading } from "./components/PageHeading";
import { StockCard } from "./components/StockCard";

const stocks = [
  {
    ticker: "FUN",
    price: 666.69,
    changePercent: -1.32,
  },
  {
    ticker: "YUM",
    price: 212.48,
    changePercent: 6.69,
  },
  {
    ticker: "FUN",
    price: 666.69,
    changePercent: -1.32,
  },
  {
    ticker: "YUM",
    price: 212.48,
    changePercent: 6.69,
  },
  {
    ticker: "FUN",
    price: 666.69,
    changePercent: -1.32,
  },
  {
    ticker: "YUM",
    price: 212.48,
    changePercent: 6.69,
  },
  {
    ticker: "FUN",
    price: 666.69,
    changePercent: -1.32,
  },
  {
    ticker: "YUM",
    price: 212.48,
    changePercent: 6.69,
  },
];

function App() {
  return (
    <div className="min-h-full">
      <PageHeading />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex w-full items-center gap-3 overflow-hidden overflow-x-auto pb-6">
            {stocks.map((stock) => (
              <StockCard key={stock.ticker} {...stock} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
