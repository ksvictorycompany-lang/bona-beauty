"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, Menu } from "lucide-react";
import { useMagazine } from "./MagazineLayout";

const NAV_LINKS = [
  { label: "Über uns", pageIndex: 1 },
  { label: "Leistungen", pageIndex: 2 },
  { label: "Galerie", pageIndex: 3 },
  { label: "Testimonials", pageIndex: 3 },
  { label: "Termin", pageIndex: 4 },
];

function LogoBrand({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true" className="flex-shrink-0">
        <circle cx="18" cy="18" r="16.5" stroke="#C9A040" strokeWidth="1.5" fill="rgba(201,160,64,0.08)" />
        <text x="18" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontStyle="italic" fontSize="14" fill="#C9A040">
          BB
        </text>
      </svg>
      {/* Text wordmark (always visible alongside image) */}
      <div className="flex items-baseline gap-0.5 leading-none">
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 500,
            fontSize: "18px",
            color: "#C9A040",
            letterSpacing: "0.02em",
          }}
        >
          bona
        </span>
        <span
          style={{
            fontFamily: "var(--font-great-vibes)",
            fontWeight: 400,
            fontSize: "22px",
            color: "#C4665A",
            letterSpacing: "0.01em",
          }}
        >
          Beauty
        </span>
      </div>
    </button>
  );
}

export function Navbar() {
  const { currentPage, goToPage } = useMagazine();
  const [menuOpen, setMenuOpen] = useState(false);
  const solidify = currentPage !== 0;

  const handleNav = (index: number) => {
    goToPage(index);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: solidify ? "rgba(255,248,245,0.94)" : "transparent",
          backdropFilter: solidify ? "blur(12px)" : "none",
          borderBottom: solidify ? "1px solid rgba(201,160,64,0.18)" : "none",
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between"
          style={{ height: "68px" }}
        >
          <LogoBrand onClick={() => handleNav(0)} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, pageIndex }) => {
              const isActive = currentPage === pageIndex;
              return (
                <button
                  key={label}
                  onClick={() => handleNav(pageIndex)}
                  className="relative px-4 py-2 text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 400,
                    color: isActive ? "#1C0A08" : "rgba(28,10,8,0.45)",
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-4 right-4 h-px"
                      style={{ background: "#C9A040" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav(4)}
              className="hidden sm:flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
              style={{
                background: "#C4665A",
                color: "#ffffff",
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.02em",
                padding: "10px 20px",
                borderRadius: "9999px",
              }}
            >
              Termin Buchen
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2"
              style={{ color: "rgba(28,10,8,0.6)" }}
              aria-label="Menü öffnen"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: "#FFF8F5" }}
          >
            <div className="flex items-center justify-between px-6 h-[68px]" style={{ borderBottom: "1px solid rgba(201,160,64,0.15)" }}>
              <LogoBrand onClick={() => { handleNav(0); setMenuOpen(false); }} />
              <button
                onClick={() => setMenuOpen(false)}
                style={{ color: "rgba(28,10,8,0.5)" }}
                aria-label="Menü schließen"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 px-6 mt-12">
              {NAV_LINKS.map(({ label, pageIndex }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  onClick={() => handleNav(pageIndex)}
                  className="text-left py-4 border-b transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: 600,
                    fontSize: "2.5rem",
                    color: currentPage === pageIndex ? "#C4665A" : "#1C0A08",
                    borderColor: "rgba(201,160,64,0.12)",
                  }}
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            <div className="px-6 mt-auto pb-12">
              <button
                onClick={() => handleNav(4)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full"
                style={{
                  background: "#C4665A",
                  color: "#ffffff",
                  fontFamily: "var(--font-space-grotesk)",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                Termin Buchen
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
