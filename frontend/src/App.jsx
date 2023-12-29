import { PageHeading } from "./components/PageHeading";
import { StockCard } from "./components/StockCard";

function App() {
  return (
    <div className="min-h-full">
      <PageHeading />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="w-full overflow-hidden flex items-center">
            <StockCard ticker="FUN" price="666.69" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
