import { FaChartLine } from "react-icons/fa";

/**
 * Empty state for application. Shown if no stock is selected.
 */
export const NoStockSelected = () => {
  return (
    <div className="flex flex-col items-center">
      <FaChartLine className="h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-semibold text-gray-900">No Stock Selected</h3>
      <p className="text-md mt-1 text-gray-500">
        Select a stock to see realtime price charts.
      </p>
    </div>
  );
};
