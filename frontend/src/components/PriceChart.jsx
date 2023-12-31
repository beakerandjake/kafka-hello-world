import { useState } from "react";
// import Chart from "react-apexcharts";

import { green, red, white, gray } from "tailwindcss/colors";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { format, addMinutes } from "date-fns";

const startDate = new Date(2022, 4, 1, 9, 30);
const endDate = new Date(2022, 4, 1, 16);

const priceChange = (timestamp, price) => {
  const nextDate = addMinutes(new Date(timestamp), 1);
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

export const PriceChart = () => {
  const [options] = useState({
    elements: {
      point: {
        pointStyle: false,
        radius: 0,
      },
      line: {
        borderWidth: 1,
        borderColor: red[400],
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        intersect: false,
        axis: "x",
        position: "nearest",
        backgroundColor: white,
        borderColor: gray[300],
        titleColor: gray[900],
        bodyColor: gray[500],
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
    animation: false,
  });
  const [data, setData] = useState({
    datasets: [
      {
        data: generateData(),
      },
    ],
    labels: ["January", "February", "March", "April"],
  });

  const addNewTime = () => {
    const { x: timestamp, y: price } = data.datasets[0].data.at(-1);
    const next = priceChange(timestamp, price);
    const newData = { data: [...data.datasets[0].data, next] };
    setData({ ...data, datasets: [newData] });
  };

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="md:min-h-52">
        <Chart type="line" options={options} data={data} />
      </div>
      <span className="text-xs font-light text-gray-500 dark:text-slate-400 text-right">
        Chart is updated every minute
      </span>
      {/* <button onClick={() => addNewTime()}>CLICK</button> */}
    </div>
  );
};
