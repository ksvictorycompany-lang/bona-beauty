"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  name: string;
  subtitle: string;
  avatarUrl?: string;
  rating?: number;
}

export function TestimonialCard({ text, name, subtitle, avatarUrl, rating = 5 }: TestimonialCardProps) {
  return (
    <div
      className="relative p-8 rounded-2xl"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(201,160,64,0.15)",
        boxShadow: "0 2px 16px rgba(28,10,8,0.05)",
      }}
    >
      <span
        className="absolute top-4 left-6 leading-none select-none pointer-events-none"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "5rem",
          color: "#C9A040",
          opacity: 0.25,
          lineHeight: 0.9,
        }}
      >
        „
      </span>

      <p
        className="relative z-10 mt-8 text-base leading-relaxed"
        style={{
          color: "rgba(28,10,8,0.65)",
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontSize: "1.05rem",
        }}
      >
        {text}
      </p>

      <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: "1px solid rgba(201,160,64,0.12)" }}>
        <div className="flex items-center gap-3">
          {avatarUrl && (
            <div
              className="relative flex-shrink-0 rounded-full overflow-hidden"
              style={{ width: 40, height: 40, border: "1.5px solid rgba(201,160,64,0.4)" }}
            >
              <Image src={avatarUrl} alt={name} fill sizes="40px" style={{ objectFit: "cover" }} />
            </div>
          )}
          <div>
            <p style={{ color: "#1C0A08", fontFamily: "var(--font-cormorant)", fontWeight: 700, fontSize: "1.05rem" }}>
              {name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(28,10,8,0.4)", fontFamily: "var(--font-space-grotesk)" }}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5" style={{ color: "#C9A040" }} fill="#C9A040" />
          ))}
        </div>
      </div>
    </div>
  );
}
