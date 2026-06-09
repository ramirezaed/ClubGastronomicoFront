// app/page.tsx
"use client";

import CTA from "@/app/components/landing/Cta";
import Features from "@/app/components/landing/Features";
import Hero from "@/app/components/landing/Hero";
import Navbar from "@/app/components/landing/NavBar";
import Planes from "@/app/components/landing/Planes";
import TelegramBot from "@/app/components/landing/TelegramBot";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Features />
      <Planes />
      <TelegramBot />
      <CTA />
    </div>
  );
}
