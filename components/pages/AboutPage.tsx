"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatCounter } from "../StatCounter";

const STATS = [
  { end: 500, suffix: "+", label: "Zufriedene Kundinnen" },
  { end: 8,   suffix: "",  label: "Jahre Erfahrung" },
  { end: 15,  suffix: "+", label: "Auszeichnungen" },
];

export function AboutPage() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,160,64,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 min-h-full flex flex-col justify-center">
        <motion.p
          {...stagger(0)}
          className="text-[10px] tracking-[0.5em] uppercase mb-8"
          style={{ color: "rgba(201,160,64,0.75)", fontFamily: "var(--font-space-grotesk)" }}
        >
          ÜBER UNS
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.h2
              {...stagger(1)}
              className="leading-none tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                color: "#1C0A08",
              }}
            >
              Wir sind mehr<br />
              als ein{" "}
              <span style={{ color: "#C4665A" }}>Salon.</span>
            </motion.h2>

            <motion.p {...stagger(2)} className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(28,10,8,0.55)", fontFamily: "var(--font-space-grotesk)", maxWidth: "440px" }}>
              Bona Beauty ist ein Ort der Transformation. Seit über acht Jahren
              begleiten wir Frauen dabei, ihren individuellen Stil zu finden —
              mit Liebe zum Detail, erstklassigen Produkten und einem Team, das
              zuhört.
            </motion.p>

            <motion.p {...stagger(3)} className="text-base leading-relaxed"
              style={{ color: "rgba(28,10,8,0.55)", fontFamily: "var(--font-space-grotesk)", maxWidth: "440px" }}>
              Von einem präzisen Schnitt bis hin zu komplexen Colorationen —
              wir schaffen Ergebnisse, die Ihr Leben verändern.
            </motion.p>
          </div>

          {/* Pull-quote */}
          <motion.div
            {...stagger(2)}
            className="relative pl-8 py-2"
            style={{ borderLeft: "2px solid #C9A040" }}
          >
            <p
              className="leading-snug"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                color: "rgba(28,10,8,0.8)",
              }}
            >
              „Schönheit ist nicht das Ziel — sie ist das Ergebnis von Vertrauen,
              Handwerk und echter Verbindung."
            </p>
            <p className="mt-6 text-sm"
              style={{ color: "rgba(201,160,64,0.85)", fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.08em" }}>
              — BONA, Inhaberin
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(201,160,64,0.18)" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="py-6 pr-8"
              style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(201,160,64,0.15)" : "none" }}
            >
              <p className="leading-none"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#C9A040" }}>
                <StatCounter end={stat.end} suffix={stat.suffix} started={hasEntered} />
              </p>
              <p className="mt-2 text-xs tracking-wider uppercase"
                style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
                {stat.label}
              </p>
            </div>
          ))}
          <div className="py-6">
            <p className="leading-none flex items-baseline gap-1"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#C9A040" }}>
              4.9
              <span style={{ color: "#C4665A", fontSize: "0.5em" }}>★</span>
            </p>
            <p className="mt-2 text-xs tracking-wider uppercase"
              style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
              Google Bewertung
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
