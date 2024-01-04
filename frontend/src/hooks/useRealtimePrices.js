import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../services/stockApi";

/**
 * Hook which returns realtime price data.
 */
export const useRealtimePrices = () => {
  const [prices, setPrices] = useState(null);
  useEffect(() => {
    const sse = new EventSource(`${API_ENDPOINT}/stocks/realtime`);
    // update latest prices whenever server pushes new data.
    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices((prev) => ({ ...prev, [data.ticker]: data.price }));
    };
    return () => {
      sse.close();
    };
  }, []);
  return prices;
};
