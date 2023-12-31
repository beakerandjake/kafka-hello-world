import { useState } from "react";
// import Chart from "react-apexcharts";

import { green, slate, red, white, gray } from "tailwindcss/colors";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { format, addMinutes } from "date-fns";
import { useDarkMode } from "../hooks/useDarkMode";

const startDate = new Date(2022, 4, 1, 9, 30);
const endDate = new Date(2022, 4, 1, 16);

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
  let timestamp = startDate.getTime();
  let amount = 145; // 390
  for (let i = 0; i < amount; i++) {
    const change = priceChange(timestamp, price);
    timestamp = change.x;
    price = change.y;
    data.push(change);
  }
  return data;
};

const getChartConfig = (isDarkMode, changePercent) => ({
  elements: {
    point: {
      pointStyle: false,
      radius: 0,
    },
    line: {
      borderWidth: 2,
      borderColor: changePercent >= 0 ? green[500] : red[500],
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      intersect: false,
      animation: true,
      axis: "x",
      position: "nearest",
      backgroundColor: isDarkMode ? gray[700] : white,
      borderColor: isDarkMode ? gray[600] : gray[300],
      titleColor: isDarkMode ? white : gray[900],
      bodyColor: isDarkMode ? slate[400] : gray[500],
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        title: ([{ raw }]) => `$${raw.y.toFixed(2)}`,
        label: ({ raw }) => format(new Date(raw.x), "MMM d, h:mm b"),
      },
    },
    crosshair: {
      zoom: {
        enabled: false,
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "hour",
      },
      min: startDate.getTime(),
      max: endDate.getTime(),
    },
  },
});

export const PriceChart = ({ changePercent }) => {
  const [data, setData] = useState({
    datasets: [
      {
        label: "price",
        data: generateData(),
        fill: {
          target: "origin",
          above:
            changePercent >= 0 ? "rgba(21, 128, 61, 0.2)" : "rgba(185, 28, 28, 0.2)", // Area will be red above the origin
        },
      },
    ],
  });
  const isDarkMode = useDarkMode();

  const addNewTime = () => {
    const { x: timestamp, y: price } = data.datasets[0].data.at(-1);
    const next = priceChange(timestamp, price);
    const newData = { data: [...data.datasets[0].data, next] };
    setData({ ...data, datasets: [newData] });
  };

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="md:min-h-52">
        <Chart
          type="line"
          options={getChartConfig(isDarkMode, changePercent)}
          data={data}
          updateMode="none"
        />
      </div>
      <span className="text-right text-xs font-light text-gray-500 dark:text-slate-400">
        Chart is updated every two minutes
      </span>
      <button onClick={() => addNewTime()}>CLICK</button>
    </div>
  );
};
