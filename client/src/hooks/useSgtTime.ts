import { useEffect, useState } from "react";

const FORMAT = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

// Harry's local time, refreshed on the minute boundary (not every second).
export const useSgtTime = () => {
  const [time, setTime] = useState(() => FORMAT.format(new Date()));
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTime(FORMAT.format(new Date()));
      id = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    };
    id = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    return () => clearTimeout(id);
  }, []);
  return time;
};
