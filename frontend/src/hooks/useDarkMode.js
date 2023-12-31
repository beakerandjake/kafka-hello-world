import { useEffect, useState } from "react";

/**
 * Hook which returns true if the the user prefers-color-scheme: dark
 */
export const useDarkMode = () => {
  const [enabled, setEnabled] = useState(false);
  const handleChange = (e) => {
    setEnabled(!!e.matches);
  };
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setEnabled(match.matches);
    match.addEventListener("change", handleChange);
    return () => match.removeEventListener("change", handleChange);
  }, []);
  return enabled;
};
