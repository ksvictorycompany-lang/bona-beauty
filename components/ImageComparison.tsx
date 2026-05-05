"use client";

import { createContext, useContext, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface ComparisonContextValue {
  sliderPosition: number;
  setSliderPosition: (v: number) => void;
  motionSliderPosition: MotionValue<number>;
}

const ComparisonContext = createContext<ComparisonContextValue | undefined>(undefined);

function useComparisonContext() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error("Must be used inside <ImageComparison>");
  return ctx;
}

interface ImageComparisonProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
}

export function ImageComparison({ children, className = "", enableHover }: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const raw = useMotionValue(50);
  const motionSliderPosition = useSpring(raw, { bounce: 0, duration: 0 });
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
    raw.set(pct);
    setSliderPosition(pct);
  };

  return (
    <ComparisonContext.Provider value={{ sliderPosition, setSliderPosition, motionSliderPosition }}>
      <div
        className={`relative overflow-hidden select-none${enableHover ? " cursor-ew-resize" : ""} ${className}`}
        onMouseMove={handleDrag}
        onMouseDown={() => { if (!enableHover) setIsDragging(true); }}
        onMouseUp={() => { if (!enableHover) setIsDragging(false); }}
        onMouseLeave={() => { if (!enableHover) setIsDragging(false); }}
        onTouchMove={handleDrag}
        onTouchStart={() => { if (!enableHover) setIsDragging(true); }}
        onTouchEnd={() => { if (!enableHover) setIsDragging(false); }}
      >
        {children}
      </div>
    </ComparisonContext.Provider>
  );
}

interface ImageComparisonImageProps {
  src: string;
  alt: string;
  position: "left" | "right";
  className?: string;
}

export function ImageComparisonImage({ src, alt, position, className = "" }: ImageComparisonImageProps) {
  const { motionSliderPosition } = useComparisonContext();

  const leftClip = useTransform(motionSliderPosition, (v) => `inset(0 0 0 ${v}%)`);
  const rightClip = useTransform(motionSliderPosition, (v) => `inset(0 ${100 - v}% 0 0)`);

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ clipPath: position === "left" ? leftClip : rightClip }}
    />
  );
}

interface ImageComparisonSliderProps {
  children?: React.ReactNode;
  className?: string;
}

export function ImageComparisonSlider({ children, className = "" }: ImageComparisonSliderProps) {
  const { motionSliderPosition } = useComparisonContext();
  const left = useTransform(motionSliderPosition, (v) => `${v}%`);

  return (
    <motion.div
      className={`absolute top-0 bottom-0 w-1 cursor-ew-resize z-10 ${className}`}
      style={{ left, x: "-50%" }}
    >
      {children}
    </motion.div>
  );
}
