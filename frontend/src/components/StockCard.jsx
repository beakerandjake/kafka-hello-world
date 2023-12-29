export const StockCard = ({ ticker, name, price, changePercent }) => {
  return (
    <div className="border=gray-200 flex items-center rounded-lg border bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="mr-2 h-8 w-8 rounded-lg bg-red-100"></div>
      <div className="flex flex-col">
        <h5 className="text-sm font-bold dark:text-white">{ticker}</h5>
        <div className="text-sm text-gray-500 dark:text-slate-400">{price}</div>
      </div>
    </div>
  );
};
