import { TickerCard } from "./TickerCard";

/**
 * Scrollable bar of ticker cards. Allows user to select a stock to view.
 */
export const TickerBar = ({ stocks, prices, selected, onSelect }) => {
  return (
    <div className="flex w-full items-center gap-3  overflow-hidden overflow-x-auto pb-6">
      {stocks.map((stock) => (
        <TickerCard
          key={stock.ticker}
          ticker={stock.ticker}
          openPrice={prices[stock.ticker].open}
          latestPrice={prices[stock.ticker].latest}
          isSelected={stock.ticker === selected}
          onClick={() => onSelect(stock.ticker)}
        />
      ))}
    </div>
  );
};
