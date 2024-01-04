import { PriceChangeBadge } from "./PriceChangeBadge";

/**
 * Displays information about the current stock price.
 */
export const PriceDetail = ({ openPrice, latestPrice }) => (
  <div className="flex gap-3">
    <h3
      key={latestPrice}
      className="fade-in text-2xl font-semibold  duration-300 dark:text-white"
    >
      ${latestPrice}
    </h3>
    <PriceChangeBadge openPrice={openPrice} latestPrice={latestPrice} />
  </div>
);
