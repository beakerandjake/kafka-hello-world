import "chartjs-adapter-date-fns";
import { format, set } from "date-fns";
import { Line } from "react-chartjs-2";
import { gray, green, red, slate, white } from "tailwindcss/colors";
import { useDarkMode } from "../hooks/useDarkMode";

// import exactly what is needed from chart.js to reduce bundle size.
import {
  Chart as ChartJS,
  Tooltip,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(LinearScale, TimeScale, PointElement, LineElement, Tooltip, Filler);

/**
 * Returns a config object for the chart.js line chart which renders the stock price.
 */
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
        label: ({ raw }) => format(new Date(raw.x), "MMM d, h:mm a"),
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
      min: set(new Date(), { hours: 9, minutes: 30 }).getTime(),
      max: set(new Date(), { hours: 16 }).getTime(),
      grid: {
        color: isDarkMode ? slate[700] : gray[300],
      },
      ticks: {
        color: isDarkMode ? slate[400] : gray[500],
      },
    },
    y: {
      grid: {
        color: isDarkMode ? slate[700] : gray[300],
      },
      ticks: {
        color: isDarkMode ? slate[400] : gray[500],
      },
    },
  },
});

/**
 * Renders the price data for a single day of trading in a line chart.
 */
export const PriceChart = ({ priceData, changePercent }) => {
  const isDarkMode = useDarkMode();
  const data = {
    datasets: [
      {
        label: "price",
        data: priceData,
        fill: {
          target: "origin",
          above:
            changePercent >= 0 ? "rgba(21, 128, 61, 0.2)" : "rgba(185, 28, 28, 0.2)",
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="md:min-h-52">
        <Line
          options={getChartConfig(isDarkMode, changePercent)}
          data={data}
          updateMode="none"
        />
      </div>
      <span className="text-right text-xs font-light text-gray-500 dark:text-slate-400">
        Chart is updated every two minutes
      </span>
    </div>
  );
};
