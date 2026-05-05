"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useMagazine } from "../MagazineLayout";
import { CathedralShader } from "../CathedralShader";

const PETALS = [
  { x: 8,  yStart: 95,  size: 14, dur: 18, delay: 0,  rot: -20 },
  { x: 22, yStart: 105, size: 10, dur: 22, delay: 4,  rot:  15 },
  { x: 38, yStart: 92,  size: 18, dur: 16, delay: 9,  rot: -10 },
  { x: 55, yStart: 100, size: 12, dur: 24, delay: 2,  rot:  25 },
  { x: 70, yStart: 88,  size: 16, dur: 20, delay: 7,  rot:  -5 },
  { x: 83, yStart: 108, size: 11, dur: 26, delay: 14, rot:  30 },
  { x: 47, yStart: 96,  size: 20, dur: 17, delay: 11, rot: -25 },
  { x: 15, yStart: 112, size: 13, dur: 21, delay: 6,  rot:  10 },
  { x: 62, yStart: 90,  size: 15, dur: 19, delay: 16, rot: -15 },
  { x: 92, yStart: 103, size: 9,  dur: 23, delay: 3,  rot:  20 },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export function HeroPage() {
  const { goToPage } = useMagazine();

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Cathedral WebGL shader background */}
      <CathedralShader />

      {/* Bottom vignette — blends shader into content area */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "45%",
          background: "linear-gradient(to top, rgba(28,10,8,0.55) 0%, rgba(28,10,8,0.15) 55%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity: 0.04, zIndex: 2 }}>
        <filter id="bb-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bb-noise)" />
      </svg>

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.yStart}%`, zIndex: 3 }}
          animate={{ y: [0, -320], opacity: [0, 0.45, 0.35, 0.1, 0], rotate: [p.rot, p.rot + 18] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={p.size} height={p.size * 1.8} viewBox="0 0 12 22" fill="none" style={{ filter: "blur(0.5px)" }}>
            <path d="M 6 0 C 10 3, 12 9, 6 22 C 0 9, 2 3, 6 0 Z" fill="rgba(255,200,190,0.7)" />
            <path d="M 6 0 C 10 3, 12 9, 6 22 C 0 9, 2 3, 6 0 Z" fill="rgba(220,150,120,0.25)" />
          </svg>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-[100px] pb-0" style={{ zIndex: 10 }}>
        <div>
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.1)}
            className="text-[10px] tracking-[0.5em] uppercase mb-10"
            style={{ color: "rgba(255,220,150,0.95)", fontFamily: "var(--font-space-grotesk)", textShadow: "0 1px 10px rgba(8,3,2,0.9)" }}
          >
            PREMIUM FRISEUR SALON · BERLIN
          </motion.p>

          {/* Headline + descriptor */}
          <div className="flex items-start justify-between gap-8">
            <motion.h1
              {...fadeUp(0.2)}
              className="leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)",
                color: "#FFFAF5",
                maxWidth: "68%",
                textShadow: "0 2px 24px rgba(8,3,2,0.85), 0 0 60px rgba(8,3,2,0.5)",
              }}
            >
              Haare, die deine<br />
              Geschichte{" "}
              <span style={{ color: "#F0A080" }}>erzählen.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
              className="hidden lg:block mt-4"
              style={{ maxWidth: "200px" }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,235,210,0.92)", fontFamily: "var(--font-space-grotesk)", textShadow: "0 1px 12px rgba(8,3,2,0.95)" }}
              >
                Wir erschaffen Looks, die Ihre Persönlichkeit widerspiegeln —
                mit Präzision und Leidenschaft.
              </p>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.65)} className="flex items-center gap-6 mt-10">
            <button
              onClick={() => goToPage(4)}
              className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-85"
              style={{
                background: "#C4665A",
                color: "#ffffff",
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.02em",
                padding: "14px 28px",
                borderRadius: "9999px",
              }}
            >
              Jetzt Termin Buchen
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(1)}
              className="flex items-center gap-2 text-sm transition-colors duration-200 hover:opacity-70"
              style={{ color: "rgba(255,225,190,0.95)", fontFamily: "var(--font-space-grotesk)", textShadow: "0 1px 10px rgba(8,3,2,0.9)" }}
            >
              Mehr Erfahren
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-6 mt-10"
          >
            <div className="flex -space-x-2">
              {["#C4665A", "#C9A040", "#8A3030", "#E8AFA8"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}, rgba(255,245,240,0.3))`,
                    borderColor: "rgba(255,245,235,0.3)",
                  }}
                />
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(255,225,195,0.95)", fontFamily: "var(--font-space-grotesk)", textShadow: "0 1px 8px rgba(8,3,2,0.9)" }}>
              <span style={{ color: "#E8C070", fontWeight: 600 }}>500+</span>{" "}
              zufriedene Kundinnen
            </p>
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(201,160,64,0.15)",
                border: "1px solid rgba(201,160,64,0.35)",
              }}
            >
              <span style={{ color: "#E8C070", fontSize: "12px" }}>★</span>
              <span style={{ color: "#E8C070", fontSize: "12px", fontFamily: "var(--font-space-grotesk)", fontWeight: 600 }}>
                4.9 Google
              </span>
            </div>
          </motion.div>
        </div>

        {/* Giant brand name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="overflow-hidden select-none"
          style={{ marginBottom: "-0.15em" }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(4.5rem, 18vw, 21rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,210,150,0.18)",
              letterSpacing: "-0.02em",
              lineHeight: 0.85,
              whiteSpace: "nowrap",
            }}
          >
            Bona Beauty
          </p>
        </motion.div>
      </div>
    </div>
  );
}
