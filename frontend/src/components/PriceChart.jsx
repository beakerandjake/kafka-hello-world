import { useState } from "react";
// import Chart from "react-apexcharts";

import { green, red } from "tailwindcss/colors";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

const startDate = new Date(2022, 4, 1, 9, 30);
const endDate = new Date(2022, 4, 1, 16);

const generateData = () => {
  const data = [];
  let price = 43.29;
  // for (let i = 0; i < 390; i++) {
  for (let i = 0; i < 145; i++) {
    const positive = Math.random() > 0.5;
    const amount = Math.random() * 10 * (positive ? 1 : -1);
    price = Math.max(0, price + amount);
    data.push({
      x: new Date(startDate.getTime() + (i + 1) * 60000).getTime(),
      y: price,
    });
  }
  console.log(data);
  return data;
};

// const [options, setOptions] = useState({
//   chart: {
//     animations: {
//       enabled: false,
//     },
//     zoom: {
//       enabled: false,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   stroke: {
//     width: 1.5,
//   },
//   xaxis: {
//     type: "datetime",
//     labels: {
//       formatter: (value, timestamp) => {
//         return new Date(timestamp).toLocaleString("en-us", {
//           hour: "numeric",
//           hour12: true,
//         });
//       },
//     },
//   },
//   yaxis: {
//     labels: {
//       formatter: (value) => {
//         return value;
//       },
//     },
//   },
//   stoke: {
//     width: 1,
//   },
// });
// const [series, setSeries] = useState([{ name: "test", data: generateData() }]);

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
  const [data] = useState({
    datasets: [
      {
        data: generateData(),
      },
    ],
    labels: ["January", "February", "March", "April"],
  });

  return (
    <div className="h-full w-full px-2 md:min-h-52">
      <Chart type="line" options={options} data={data} />
    </div>
  );
};
