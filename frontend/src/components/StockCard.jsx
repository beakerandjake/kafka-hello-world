import clsx from "clsx";
import { PriceChangeBadge } from "./PriceChangeBadge";

export const StockCard = ({ ticker, price, percentChange, isSelected, onClick }) => {
  return (
    <div
      className={clsx(
        "m-1 flex cursor-pointer items-center rounded-lg border border-slate-300 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800 ",
        isSelected
          ? "outline outline-2 outline-blue-500 dark:outline-slate-400"
          : "hover:bg-slate-100 dark:hover:bg-slate-700",
      )}
      onClick={() => !isSelected && onClick()}
    >
      <div className="mr-2 flex flex-col">
        <h5 className="text-sm font-bold dark:text-white">{ticker}</h5>
        <div className="text-sm text-gray-500 dark:text-slate-400">{price}</div>
      </div>
      <PriceChangeBadge percentChange={percentChange} />
    </div>
  );
};
