import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../services/stockApi";
import { parseISO } from "date-fns";

/**
 * Hook which return a continual stream of latest price changes as they happen.
 */
export const useRealtimePrices = () => {
  const [latest, setLatest] = useState(null);
  useEffect(() => {
    const sse = new EventSource(`${API_ENDPOINT}/stocks/realtime`);
    // update latest prices whenever server pushes new data.
    sse.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      parsed.date = parseISO(parsed.date);
      setLatest(parsed);
    };
    return () => {
      sse.close();
    };
  }, []);
  return latest;
};
