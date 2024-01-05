/**
 * Card which displays information about a specific stock
 */
export const StockDetailCard = ({ name, children }) => {
  return (
    <div className="fade-in w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-slate-700">
        <h1 className="text-xl font-medium leading-6 text-gray-900  dark:text-white">
          {name}
        </h1>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-4 px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
};
