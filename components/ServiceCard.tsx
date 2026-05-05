"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMagazine } from "./MagazineLayout";

interface ServiceCardProps {
  index: number;
  title: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
}

export function ServiceCard({ index, title, description, priceRange, icon }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  const { goToPage } = useMagazine();

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative p-8 rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: hovered ? "1px solid rgba(201,160,64,0.4)" : "1px solid rgba(201,160,64,0.15)",
        boxShadow: hovered
          ? "0 20px 60px rgba(196,102,90,0.12), 0 4px 16px rgba(201,160,64,0.08)"
          : "0 2px 16px rgba(28,10,8,0.06)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Hover rose glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,160,64,0.06) 0%, transparent 70%)" }}
          />
        )}
      </AnimatePresence>

      {/* Gold top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg, #C9A040, #C4665A)", transformOrigin: "left" }}
      />

      <span className="text-xs tracking-widest" style={{ color: "rgba(201,160,64,0.6)", fontFamily: "var(--font-space-grotesk)" }}>
        0{index + 1}
      </span>

      <div className="mt-4 text-3xl">{icon}</div>

      <h3 className="mt-3 text-2xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 700, color: "#1C0A08" }}>
        {title}
      </h3>

      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm leading-relaxed overflow-hidden"
            style={{ color: "rgba(28,10,8,0.55)", fontFamily: "var(--font-space-grotesk)" }}
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: "1px solid rgba(201,160,64,0.12)" }}>
        <span className="text-sm font-semibold" style={{ color: "#C9A040", fontFamily: "var(--font-space-grotesk)" }}>
          {priceRange}
        </span>
        <button
          onClick={() => goToPage(4)}
          className="text-xs tracking-wider px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
          style={{ background: "rgba(196,102,90,0.1)", color: "#C4665A", fontFamily: "var(--font-space-grotesk)", fontWeight: 600 }}
        >
          Buchen →
        </button>
      </div>
    </motion.div>
  );
}
