"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { TestimonialCard } from "../TestimonialCard";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "../ImageComparison";

const pexels = (id: number, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// Geometric cut-corner clip paths — cycles across gallery images
const GALLERY_CLIPS = [
  "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
  "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
  "polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)",
  "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
  "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)",
  "polygon(12% 0, 100% 0, 100% 88%, 88% 100%, 0 100%, 0 12%)",
];

const GALLERY_ITEMS = [
  { id: 3993449, label: "Glossing" },
  { id: 3065173, label: "Braut-Look" },
  { id: 3065170, label: "Precision Cut" },
  { id: 3738341, label: "Balayage" },
  { id: 2681751, label: "Highlights" },
  { id: 1319460, label: "Color Melt" },
];

const COMPARISONS = [
  { beforeSrc: "/ba-1-before.jpg", afterSrc: "/ba-1-after.jpg", label: "Highlights" },
  { beforeSrc: "/ba-2-after.jpg", afterSrc: "/ba-2-before.jpg", label: "Precision Cut" },
  { beforeSrc: "/ba-3-before.jpg", afterSrc: "/ba-3-after.jpg", label: "Glossing" },
  { beforeSrc: "/ba-4-before.jpg", afterSrc: "/ba-4-after.jpg", label: "Balayage" },
];

const TESTIMONIALS = [
  {
    text: "Das beste Salon-Erlebnis, das ich je hatte. Bona hat genau verstanden, was ich wollte — das Ergebnis hat mich zu Tränen gerührt.",
    name: "Sophie M.",
    subtitle: "Kundin seit 2021",
    avatarUrl: pexels(1065084, 120),
  },
  {
    text: "Die Balayage-Behandlung war absolut perfekt. Das Team ist professionell, herzlich und das Ergebnis übertrifft jede Erwartung.",
    name: "Lisa K.",
    subtitle: "Stammkundin",
    avatarUrl: pexels(1130626, 120),
  },
  {
    text: "Für meinen Hochzeitstag war Bona Beauty die beste Entscheidung. Das Braut-Styling hat mich strahlen lassen wie nie zuvor.",
    name: "Anna R.",
    subtitle: "Braut 2024",
    avatarUrl: pexels(1542085, 120),
  },
];

type ComparisonItem = typeof COMPARISONS[number];

export function GalleryPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<ComparisonItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 70% 15%, rgba(201,160,64,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: hasEntered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.5em] uppercase mb-6"
          style={{
            color: "rgba(201,160,64,0.75)",
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          GALERIE & TESTIMONIALS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 16 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="leading-none mb-10"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            color: "#1C0A08",
          }}
        >
          Unsere{" "}
          <span style={{ color: "#C4665A" }}>Arbeiten</span>
        </motion.h2>

        {/* ── Before / After section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <p
            className="text-[10px] tracking-[0.5em] uppercase mb-2"
            style={{ color: "rgba(201,160,64,0.75)", fontFamily: "var(--font-space-grotesk)" }}
          >
            TRANSFORMATIONEN
          </p>
          <p
            className="text-sm mb-6"
            style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}
          >
            Vorher &amp; Nachher — bewegen Sie den Regler
          </p>

          <div className="grid grid-cols-2 gap-3">
            {COMPARISONS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 16 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <div
                  className="relative rounded-xl overflow-hidden md:cursor-default cursor-pointer"
                  style={{ aspectRatio: "3 / 4" }}
                  onClick={() => { if (window.innerWidth < 768) setLightbox(item); }}
                >
                  <ImageComparison className="w-full h-full" enableHover>
                    <ImageComparisonImage
                      position="left"
                      src={item.afterSrc}
                      alt="Nachher"
                    />
                    <ImageComparisonImage
                      position="right"
                      src={item.beforeSrc}
                      alt="Vorher"
                    />
                    {/* Branded slider */}
                    <ImageComparisonSlider className="bg-white/20 backdrop-blur-[2px]">
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: "#C4665A",
                          border: "2px solid rgba(255,255,255,0.55)",
                        }}
                      >
                        <ChevronsLeftRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </ImageComparisonSlider>
                    {/* Vorher / Nachher corner labels */}
                    <div
                      className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded-full text-[10px] tracking-wider"
                      style={{
                        background: "rgba(10,8,7,0.55)",
                        backdropFilter: "blur(4px)",
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      Vorher
                    </div>
                    <div
                      className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full text-[10px] tracking-wider"
                      style={{
                        background: "rgba(196,102,90,0.45)",
                        backdropFilter: "blur(4px)",
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "var(--font-space-grotesk)",
                      }}
                    >
                      Nachher
                    </div>
                  </ImageComparison>
                </div>
                {/* Treatment label */}
                <span
                  className="text-xs tracking-wider pl-1"
                  style={{ color: "rgba(28,10,8,0.45)", fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Photo strip ── */}
        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-4"
          style={{ color: "rgba(201,160,64,0.75)", fontFamily: "var(--font-space-grotesk)" }}
        >
          GALERIE
        </p>

        {/* Gallery horizontal scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hasEntered ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex-shrink-0 overflow-hidden cursor-pointer"
              style={{
                width: "200px",
                height: "280px",
                clipPath: GALLERY_CLIPS[i % GALLERY_CLIPS.length],
              }}
            >
              <Image
                src={pexels(item.id)}
                alt={item.label}
                fill
                sizes="200px"
                style={{ objectFit: "cover" }}
              />

              {/* Dark overlay always */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,8,7,0.75) 0%, rgba(10,8,7,0.1) 55%, transparent 100%)",
                }}
              />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
                style={{
                  background: "rgba(196,102,90,0.08)",
                }}
              />

              {/* Label */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="text-sm font-semibold tracking-wider"
                  style={{
                    color: hoveredIndex === i ? "#ffffff" : "rgba(255,255,255,0.75)",
                    fontFamily: "var(--font-space-grotesk)",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10"
        >
          <h3
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{
              color: "rgba(201,160,64,0.75)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            WAS KUNDINNEN SAGEN
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: hasEntered ? 1 : 0,
                  y: hasEntered ? 0 : 16,
                }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <TestimonialCard
                  text={t.text}
                  name={t.name}
                  subtitle={t.subtitle}
                  avatarUrl={t.avatarUrl}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Mobile lightbox ── (md and above: never shown) */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] md:hidden flex flex-col"
          style={{ background: "rgba(10,8,7,0.96)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(201,160,64,0.15)" }}
          >
            <span
              className="text-sm tracking-wider"
              style={{ color: "rgba(255,240,220,0.8)", fontFamily: "var(--font-space-grotesk)" }}
            >
              {lightbox.label}
            </span>
          </div>

          {/* Comparison — full remaining height */}
          <div className="flex-1 relative">
            <ImageComparison className="w-full h-full" enableHover>
              <ImageComparisonImage position="left" src={lightbox.afterSrc} alt="Nachher" />
              <ImageComparisonImage position="right" src={lightbox.beforeSrc} alt="Vorher" />
              <ImageComparisonSlider className="bg-white/20 backdrop-blur-[2px]">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "#C4665A", border: "2px solid rgba(255,255,255,0.55)" }}
                >
                  <ChevronsLeftRight className="w-4 h-4 text-white" />
                </div>
              </ImageComparisonSlider>
              <div
                className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-full text-[11px] tracking-wider"
                style={{ background: "rgba(196,102,90,0.55)", backdropFilter: "blur(4px)", color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-space-grotesk)" }}
              >
                Nachher
              </div>
              <div
                className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full text-[11px] tracking-wider"
                style={{ background: "rgba(10,8,7,0.55)", backdropFilter: "blur(4px)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-space-grotesk)" }}
              >
                Vorher
              </div>
            </ImageComparison>
          </div>

          {/* Close button — clearly below the image, safe from slider */}
          <button
            onClick={() => setLightbox(null)}
            className="flex-shrink-0 w-full py-5 flex items-center justify-center gap-2 text-sm tracking-widest"
            style={{
              background: "rgba(201,160,64,0.1)",
              borderTop: "1px solid rgba(201,160,64,0.2)",
              color: "rgba(255,240,220,0.85)",
              fontFamily: "var(--font-space-grotesk)",
            }}
            aria-label="Schließen"
          >
            ✕ &nbsp; SCHLIESSEN
          </button>
        </motion.div>
      )}
    </div>
  );
}
