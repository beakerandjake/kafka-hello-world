import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { clsx } from "clsx";

/**
 * A badge which displays the current price change percentage.
 */
export const PriceChangeBadge = ({ percent }) => {
  const isPositive = percent >= 0;
  const formatted = Math.abs(percent || 0).toFixed(2);
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center gap-1 rounded-lg pl-1 pr-1 text-base/7 font-medium",
        isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
      )}
    >
      <span className="text-sm">{isPositive ? <FaArrowUp /> : <FaArrowDown />}</span>
      {formatted}%
    </div>
  );
};
