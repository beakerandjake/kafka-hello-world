import clsx from "clsx";
import { PriceChangeBadge } from "./PriceChangeBadge";

/**
 * Displays information about the current stock price.
 */
export const PriceDetail = ({ openPrice, latestPrice }) => {
  const delta = latestPrice - openPrice;
  const positive = delta >= 0;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Current Price */}
        <h3
          key={latestPrice}
          className="fade-in text-2xl font-semibold dark:text-white"
        >
          ${latestPrice.toFixed(2)}
        </h3>
        <PriceChangeBadge openPrice={openPrice} latestPrice={latestPrice} />
        {/* Price Delta */}
        <h2
          className={clsx(
            "text-lg font-medium transition-colors",
            positive
              ? "text-green-700 dark:text-green-600"
              : "text-red-700 dark:text-red-600",
          )}
        >
          {positive && "+"}
          {delta.toFixed(2)}
        </h2>
      </div>
      {/* Open Price */}
      <span className="flex gap-2 text-sm">
        <span className="text-gray-500 dark:text-slate-400">Open:</span>
        <span className="dark:text-white">${openPrice}</span>
      </span>
    </div>
  );
};
