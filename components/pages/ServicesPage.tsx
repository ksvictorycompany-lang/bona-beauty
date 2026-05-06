"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Droplets, Sparkles, Heart } from "lucide-react";
import { CardStack } from "../CardStack";
import { SpotlightServiceCard } from "../SpotlightServiceCard";

const SERVICES = [
  {
    title: "Schnitt & Styling",
    description: "Präzise Schnitte, individuell auf Ihre Gesichtszüge und Haarstruktur abgestimmt. Von klassisch bis avantgardistisch — wir finden Ihren perfekten Look.",
    priceRange: "ab 65 €",
    icon: <Scissors className="w-7 h-7" style={{ color: "#C4665A" }} />,
  },
  {
    title: "Farbe & Highlights",
    description: "Balayage, Highlights, Vollfarben und Glossings — mit professionellen Produkten für strahlende, langanhaltende Ergebnisse ohne Kompromisse.",
    priceRange: "ab 90 €",
    icon: <Droplets className="w-7 h-7" style={{ color: "#C4665A" }} />,
  },
  {
    title: "Pflegebehandlungen",
    description: "Intensive Haarkuren, Keratin-Treatments und tiefenwirksame Regenerationstherapien für gesundes, glänzendes Haar von innen heraus.",
    priceRange: "ab 55 €",
    icon: <Sparkles className="w-7 h-7" style={{ color: "#C4665A" }} />,
  },
  {
    title: "Braut-Styling",
    description: "Ihr perfekter Look für den schönsten Tag Ihres Lebens. Hochsteckfrisuren, offene Looks, Probe-Styling — exklusiv und unvergesslich.",
    priceRange: "ab 120 €",
    icon: <Heart className="w-7 h-7" style={{ color: "#C4665A" }} />,
  },
];

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
};

const STACK_ITEMS: ServiceItem[] = SERVICES.map((s, i) => ({ id: i, ...s }));

export function ServicesPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [cardDims, setCardDims] = useState({ width: 340, height: 420, spread: 44, overlap: 0.46, maxVisible: 7 });

  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setCardDims(mobile
        ? { width: Math.min(240, window.innerWidth - 48), height: 300, spread: 22, overlap: 0.52, maxVisible: 3 }
        : { width: 340, height: 420, spread: 44, overlap: 0.46, maxVisible: 7 }
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196,102,90,0.07) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-16 min-h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: hasEntered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ color: "rgba(201,160,64,0.75)", fontFamily: "var(--font-space-grotesk)" }}
          >
            LEISTUNGEN
          </motion.p>

          <div className="relative">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 16 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="leading-none tracking-wider select-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 5.5vw, 5rem)",
                color: "rgba(201,160,64,0.55)",
                letterSpacing: "0.06em",
              }}
            >
              UNSERE LEISTUNGEN
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: hasEntered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 text-base"
              style={{ color: "rgba(28,10,8,0.45)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Maßgeschneiderte Services für anspruchsvolle Frauen
            </motion.p>
          </div>
        </div>

        {/* Card stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 24 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <CardStack<ServiceItem>
            items={STACK_ITEMS}
            cardWidth={cardDims.width}
            cardHeight={cardDims.height}
            maxVisible={cardDims.maxVisible}
            spreadDeg={cardDims.spread}
            overlap={cardDims.overlap}
            loop
            showDots
            renderCard={(item, { active }) => (
              <SpotlightServiceCard
                index={item.id}
                title={item.title}
                description={item.description}
                priceRange={item.priceRange}
                icon={item.icon as React.ReactNode}
                active={active}
              />
            )}
          />
        </motion.div>
      </div>
    </div>
  );
}
