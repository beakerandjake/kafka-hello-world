import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../services/stockApi";
import { parseISO } from "date-fns";

/**
 * Hook which provides the latest price change of the stocks.
 */
export const useRealtimePrices = () => {
  const [latest, setLatest] = useState(null);
  useEffect(() => {
    const sse = new EventSource(`${API_ENDPOINT}/stocks/realtime`);
    // update latest prices whenever server pushes new data.
    sse.onmessage = (event) => {
      const { timestamp, ...rest } = JSON.parse(event.data);
      setLatest({ ...rest, timestamp: parseISO(timestamp) });
    };
    return () => {
      sse.close();
    };
  }, []);
  return latest;
};
