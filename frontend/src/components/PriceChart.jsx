import { useState } from "react";
import Chart from "react-apexcharts";

const generateData = () => {
  const data = [];
  let price = 43.29;
  const startDate = new Date(2022, 4, 1, 9, 30);
  for (let i = 0; i < 390; i++) {
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

export const PriceChart = () => {
  const [options, setOptions] = useState({
    chart: {
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 1.5,
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: (value, timestamp) => {
          return new Date(timestamp).toLocaleString("en-us", {
            hour: "numeric",
            hour12: true,
          });
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return value;
        },
      },
    },
    stoke: {
      width: 1,
    },
  });
  const [series, setSeries] = useState([{ name: "test", data: generateData() }]);
  return (
    <div>
      <Chart options={options} series={series} type="line" />
    </div>
  );
};
