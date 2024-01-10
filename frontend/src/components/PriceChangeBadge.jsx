import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { clsx } from "clsx";

/**
 * Returns the percent that the stock has changed from its open price
 */
const calculatePercentChange = (openPrice, latestPrice) => {
  if (Number.isNaN(openPrice) || Number.isNaN(latestPrice)) {
    return 0;
  }
  return ((latestPrice - openPrice) / openPrice) * 100;
};

/**
 * A badge which displays the change percentage between the open and latest price.
 */
export const PriceChangeBadge = ({ openPrice, latestPrice }) => {
  const change = calculatePercentChange(openPrice, latestPrice);
  const isPositive = change >= 0;
  const formatted = Math.abs(change).toFixed(2);
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 font-medium transition-colors duration-75",
        isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
      )}
    >
      <span className="text-sm">{isPositive ? <FaArrowUp /> : <FaArrowDown />}</span>
      <span key={change} className="fade-in">
        {formatted}%
      </span>
    </div>
  );
};
