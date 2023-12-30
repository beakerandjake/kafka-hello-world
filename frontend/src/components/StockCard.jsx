import { PriceChangeBadge } from "./PriceChangeBadge";

export const StockCard = ({ ticker, price, changePercent, onClick }) => {
  return (
    <div
      className="flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white p-2 shadow hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-slate-700"
      onClick={onClick}
    >
      <div className="mr-2 flex flex-col">
        <h5 className="text-sm font-bold dark:text-white">{ticker}</h5>
        <div className="text-sm text-gray-500 dark:text-slate-400">{price}</div>
      </div>
      <PriceChangeBadge percent={changePercent} />
    </div>
  );
};
