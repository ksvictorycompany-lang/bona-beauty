"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// Palette-adapted version of hammamikhairi/animated-gradient-background
// Warm cream center → soft peach → muted gold → blush rose at corners
const COLORS = [
  "#FFF8F5", // cream center
  "#FFF2E4", // warm cream
  "#FFE4C8", // soft peach
  "#F5C895", // muted gold
  "#E8AFA8", // blush
  "#D49070", // warm amber
  "#C4665A", // rose edge
];
const STOPS = [25, 40, 55, 65, 75, 88, 100];
const STARTING_GAP = 80;
const BREATHING_RANGE = 5;
const SPEED = 0.012;
const TOP_OFFSET = 15;

export function BackgroundGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let width = STARTING_GAP;
    let dir = 1;

    const animate = () => {
      if (width >= STARTING_GAP + BREATHING_RANGE) dir = -1;
      if (width <= STARTING_GAP - BREATHING_RANGE) dir = 1;
      width += dir * SPEED;

      const stops = STOPS.map((s, i) => `${COLORS[i]} ${s}%`).join(", ");

      if (containerRef.current) {
        containerRef.current.style.background = `radial-gradient(${width}% ${width + TOP_OFFSET}% at 50% 20%, ${stops})`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="absolute inset-0 overflow-hidden"
    >
      <div ref={containerRef} className="absolute inset-0" />
    </motion.div>
  );
}
