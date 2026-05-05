"use client";

import { useEffect, useState } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  started: boolean;
}

export function StatCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 1500,
  started,
}: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
