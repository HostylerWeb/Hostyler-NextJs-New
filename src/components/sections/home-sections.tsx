import { AiSection } from "@/components/sections/ai-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LogosSection } from "@/components/sections/logos-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProcessSection } from "@/components/sections/process-section";
import { RevealInit } from "@/components/sections/reveal-init";
import { ServicesSection } from "@/components/sections/services-section";
import { TeamSection } from "@/components/sections/team-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhySection } from "@/components/sections/why-section";
import { WorkSection } from "@/components/sections/work-section";

export function HomeSections() {
  return (
    <RevealInit>
      <HeroSection />
      <MarqueeSection />
      <LogosSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <CaseStudySection />
      <AiSection />
      <TestimonialsSection />
      <PricingSection />
      <TeamSection />
      <WhySection />
      <FaqSection />
      <ContactSection />
    </RevealInit>
  );
}
