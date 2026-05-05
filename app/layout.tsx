import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bona Beauty — Premium Friseur Salon Berlin",
  description:
    "Exklusiver Haarsalon in Berlin. Schnitt, Farbe, Styling und Braut-Services für anspruchsvolle Frauen.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${greatVibes.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
