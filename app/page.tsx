"use client";

import { MagazineLayout } from "@/components/MagazineLayout";
import { Navbar } from "@/components/Navbar";
import { HeroPage } from "@/components/pages/HeroPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { BookingPage } from "@/components/pages/BookingPage";

const PAGES = [
  <HeroPage key="hero" />,
  <AboutPage key="about" />,
  <ServicesPage key="services" />,
  <GalleryPage key="gallery" />,
  <BookingPage key="booking" />,
];

export default function Home() {
  return (
    <MagazineLayout pages={PAGES}>
      <Navbar />
    </MagazineLayout>
  );
}
