import { PriceChangeBadge } from "./PriceChangeBadge";

export const StockCard = ({ ticker, name, price, changePercent }) => {
  return (
    <div className="border=gray-200 flex items-center rounded-lg border bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="mr-2 flex flex-col">
        <h5 className="text-sm font-bold dark:text-white">{ticker}</h5>
        <div className="text-sm text-gray-500 dark:text-slate-400">{price}</div>
      </div>
      <PriceChangeBadge percent={changePercent} />
    </div>
  );
};
