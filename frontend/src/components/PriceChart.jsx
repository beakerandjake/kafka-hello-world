import "chartjs-adapter-date-fns";
import { format, isBefore, isSameMinute } from "date-fns";
import { useEffect, useRef } from "react";
import { gray, green, red, slate, white } from "tailwindcss/colors";
import { useDarkMode } from "../hooks/useDarkMode";
import { getPriceHistory } from "../services/stockApi";
import {
  Chart as ChartJS,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineController,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

/**
 * Config for a line chart which can display price data.
 */
const defaultConfig = {
  type: "line",
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      colors: { duration: 100 },
      y: {
        duration: 350,
      },
    },
    elements: {
      point: {
        pointStyle: false,
        radius: 0,
      },
      line: {
        borderWidth: 2,
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
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: ([{ raw }]) => `$${raw.y.toFixed(2)}`,
          label: ({ raw }) => format(new Date(raw.x), "MMM d, h:mm a"),
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
        },
      },
    },
  },
  data: {
    datasets: [
      {
        data: [],
        fill: {
          target: "origin",
        },
      },
    ],
  },
};

/**
 * Replace the chart data entirely with new data.
 */
const updateChartData = (chart, data) => {
  chart.data.datasets[0].data = data;
  chart.update();
};

/**
 * Update the line colors of the chart based on the price direction.
 */
const setLineColor = (chart, positive) => {
  chart.data.datasets.forEach((dataset) => {
    dataset.borderColor = positive ? green[500] : red[500];
    dataset.fill.above = positive
      ? "rgba(21, 128, 61, 0.2)"
      : "rgba(185, 28, 28, 0.2)";
  });
  chart.update();
};

/**
 * Update the basic color of the chart for light/dark mode.
 */
const setChartColor = (chart, isDarkMode) => {
  chart.options.plugins.tooltip.backgroundColor = isDarkMode ? gray[700] : white;
  chart.options.plugins.tooltip.borderColor = isDarkMode ? gray[600] : gray[300];
  chart.options.plugins.tooltip.titleColor = isDarkMode ? white : gray[900];
  chart.options.plugins.tooltip.bodyColor = isDarkMode ? slate[400] : gray[500];
  chart.options.scales.x.grid.color = isDarkMode ? slate[700] : gray[300];
  chart.options.scales.x.ticks.color = isDarkMode ? slate[400] : gray[500];
  chart.options.scales.y.grid.color = isDarkMode ? slate[700] : gray[300];
  chart.options.scales.y.ticks.color = isDarkMode ? slate[400] : gray[500];
  chart.update();
};

/**
 * Mutates the chart date with the latest price data.
 * Updates the last data point if the latest price falls in the same minute.
 * Adds a new data point if the latest price falls after the last data point.
 */
const updateWithLatestPrice = (
  chart,
  lastDataPoint,
  latestPrice,
  latestTimestamp,
) => {
  const lastTimestamp = new Date(lastDataPoint.x);

  if (isBefore(latestTimestamp, lastTimestamp)) {
    return;
  }
  
  if (isSameMinute(lastTimestamp, latestTimestamp)) {
    lastDataPoint.y = latestPrice;
  } else {
    chart.data.datasets[0].data.push({
      x: latestTimestamp.getTime(),
      y: latestPrice,
    });
  }

  chart.update();
};

/**
 * Renders the price data of the stock in a line chart.
 */
export const PriceChart = ({ ticker, priceData, priceDirection }) => {
  const canvasRef = useRef();
  const chartRef = useRef();
  const isDarkMode = useDarkMode();

  // create a chart on the canvas on load.
  useEffect(() => {
    chartRef.current = new ChartJS(canvasRef.current, defaultConfig);
    return () => {
      chartRef.current.destroy();
    };
  }, []);

  // load new chart data when a new ticker is selected
  useEffect(() => {
    let ignore = false;
    getPriceHistory(ticker).then((result) => {
      if (!ignore) {
        updateChartData(chartRef.current, result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [ticker]);

  // change chart color when price direction changes.
  useEffect(() => {
    setLineColor(chartRef.current, priceDirection >= 0);
  }, [priceDirection]);

  // change chart color based on light/dark mode.
  useEffect(() => {
    setChartColor(chartRef.current, isDarkMode);
  }, [isDarkMode]);

  // update the chart data with the latest price changes.
  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const last = chartRef.current.data.datasets[0].data?.at(-1);
    if (last) {
      updateWithLatestPrice(
        chartRef.current,
        last,
        priceData.latest,
        priceData.timestamp,
      );
    }
  }, [priceData.timestamp, priceData.latest]);

  return (
    <div className="md:min-h-52">
      <canvas ref={canvasRef} />
    </div>
  );
};
