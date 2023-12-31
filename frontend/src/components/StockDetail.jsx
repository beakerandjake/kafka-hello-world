import { useState } from "react";
import { PriceChangeBadge } from "./PriceChangeBadge";
import { PriceChart } from "./PriceChart";
import { addMinutes, set } from "date-fns";

const priceChange = (timestamp, price) => {
  const nextDate = addMinutes(new Date(timestamp), 2);
  const positive = Math.random() > 0.5;
  const amount = Math.random() * 10 * (positive ? 1 : -1);
  const newPrice = Math.max(0, price + amount);
  return {
    x: nextDate.getTime(),
    y: newPrice,
  };
};

const generateData = () => {
  const data = [];
  let price = 43.29;
  let timestamp = set(new Date(), { hours: 9, minutes: 30 }).getTime();
  let amount = 145; // 390
  for (let i = 0; i < amount; i++) {
    const change = priceChange(timestamp, price);
    timestamp = change.x;
    price = change.y;
    data.push(change);
  }
  return data;
};

export const StockDetail = ({ ticker, name, price, changePercent }) => {
  const [data, setData] = useState(generateData());

  const addNewData = () => {
    const { x: timestamp, y: price } = data.at(-1);
    const next = priceChange(timestamp, price);
    setData([...data, next]);
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6 dark:border-slate-700">
        <h1 className="text-xl font-medium leading-6 text-gray-900  dark:text-white">
          {name}
        </h1>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2 px-4 py-5 sm:p-6">
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold  dark:text-white">${price}</h3>
          <PriceChangeBadge percent={changePercent} />
        </div>
        <PriceChart priceData={data} changePercent={changePercent} />
      </div>
      <button onClick={addNewData}>Click</button>
    </div>
  );
};
