import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { FaSearch, FaSearchDollar } from "react-icons/fa";

export const StockSearch = ({ stocks }) => {
  const [text, setText] = useState("");

  return (
    <div className="mx-auto max-w-3xl rounded-3xl shadow-md">
      <Combobox value={text}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <FaSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          <Combobox.Input
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search for stocks..."
          ></Combobox.Input>
        </div>
        <Combobox.Options>
          {stocks.map((stock) => (
            <Combobox.Option key={stock.id} value={stock.ticker}>
              {stock.ticker}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
