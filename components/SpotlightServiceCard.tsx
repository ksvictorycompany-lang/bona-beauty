"use client";

import { useEffect, useRef } from "react";
import { useMagazine } from "./MagazineLayout";

interface SpotlightServiceCardProps {
  index: number;
  title: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
  active?: boolean;
}

export function SpotlightServiceCard({ index, title, description, priceRange, icon }: SpotlightServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { goToPage } = useMagazine();

  useEffect(() => {
    const sync = (e: PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty("--x", e.clientX.toFixed(2));
      el.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      el.style.setProperty("--y", e.clientY.toFixed(2));
      el.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);

  // Spotlight: rose (hue 350) → warm amber (hue 30) as cursor sweeps left→right
  const cssVars = {
    "--border-size": "1.5px",
    "--spotlight-size": "280px",
    "--radius": "16",
    "--outer": "1",
    "--saturation": "58",
    "--lightness": "62",
    "--bg-spot-opacity": "0.06",
    "--border-spot-opacity": "0.9",
    "--border-light-opacity": "0.55",
    "--base": "350",
    "--spread": "40",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      data-glow
      className="relative h-full w-full rounded-2xl overflow-hidden"
      style={{
        ...cssVars,
        backgroundImage: [
          `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),`,
          `hsl(var(--hue, 350) calc(var(--saturation, 58) * 1%) calc(var(--lightness, 62) * 1%) / var(--bg-spot-opacity, 0.06)),`,
          `transparent)`,
        ].join(" "),
        backgroundColor: "rgba(255,255,255,0.97)",
        backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
        backgroundPosition: "50% 50%",
        backgroundAttachment: "fixed",
        border: "var(--border-size) solid rgba(201,160,64,0.22)",
        touchAction: "none",
      }}
    >
      {/* Inner glow layer */}
      <div data-glow className="absolute inset-0 rounded-2xl" />

      {/* Gold top line — always visible */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,160,64,0.5), transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-8">
        <span
          className="text-xs tracking-widest"
          style={{ color: "rgba(201,160,64,0.55)", fontFamily: "var(--font-space-grotesk)" }}
        >
          0{index + 1}
        </span>

        <div className="mt-5">{icon}</div>

        <h3
          className="mt-4 text-2xl leading-tight"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, color: "#1C0A08" }}
        >
          {title}
        </h3>

        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "rgba(28,10,8,0.55)", fontFamily: "var(--font-space-grotesk)" }}
        >
          {description}
        </p>

        <div
          className="mt-auto pt-5 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(201,160,64,0.15)" }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: "#C9A040", fontFamily: "var(--font-space-grotesk)" }}
          >
            {priceRange}
          </span>
          <button
            onClick={() => goToPage(4)}
            className="text-xs tracking-wider px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
            style={{
              background: "rgba(196,102,90,0.1)",
              color: "#C4665A",
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
            }}
          >
            Buchen →
          </button>
        </div>
      </div>
    </div>
  );
}
