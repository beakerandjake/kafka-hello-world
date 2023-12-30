import { PageHeading } from "./components/PageHeading";
import { StockCard } from "./components/StockCard";
import { StockSearch } from "./components/StockSearch";

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
  return (
    <div className="min-h-full">
      <PageHeading />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex w-full items-center gap-3  overflow-hidden overflow-x-auto pb-6">
            {stocks.map((stock) => (
              <StockCard
                key={stock.ticker}
                {...stock}
                onClick={() => console.log("clicked on a stock", stock.ticker)}
              />
            ))}
          </div>
          <StockSearch stocks={stocks} />
        </div>
      </main>
    </div>
  );
}

export default App;
