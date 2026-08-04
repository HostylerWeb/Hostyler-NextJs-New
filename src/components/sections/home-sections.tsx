import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { LogosSection } from "@/components/sections/logos-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { RevealInit } from "@/components/sections/reveal-init";
import { ServicesSection } from "@/components/sections/services-section";

const HomeBelowFold = dynamic(
  () => import("@/components/sections/home-below-fold").then((mod) => mod.HomeBelowFold),
);

export function HomeSections() {
  return (
    <RevealInit>
      <HeroSection />
      <MarqueeSection />
      <LogosSection />
      <ServicesSection />
      <HomeBelowFold />
    </RevealInit>
  );
}
