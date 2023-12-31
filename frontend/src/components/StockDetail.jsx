import { PriceChangeBadge } from "./PriceChangeBadge";
import { PriceChart } from "./PriceChart";

export const StockDetail = ({ ticker, name, price, changePercent }) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-xl font-medium leading-6 text-gray-900">{name}</h1>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2 px-4 py-5 sm:p-6">
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">${price}</h3>
          <PriceChangeBadge percent={changePercent} />
        </div>
        <PriceChart />
      </div>
    </div>
  );
};
