import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../services/stockApi";

/**
 * Hook which return a continual stream of latest price changes as they happen.
 */
export const useRealtimePrices = () => {
  const [latest, setLatest] = useState(null);
  useEffect(() => {
    const sse = new EventSource(`${API_ENDPOINT}/stocks/realtime`);
    // update latest prices whenever server pushes new data.
    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLatest({ ticker: data.ticker, price: data.price });
    };
    return () => {
      sse.close();
    };
  }, []);
  return latest;
};
