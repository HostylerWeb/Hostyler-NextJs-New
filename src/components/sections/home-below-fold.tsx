import { AiSection } from "@/components/sections/ai-section";
import { CaseStudySection } from "@/components/sections/case-study-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TeamSection } from "@/components/sections/team-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhySection } from "@/components/sections/why-section";
import { WorkSection } from "@/components/sections/work-section";

export function HomeBelowFold() {
  return (
    <>
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
    </>
  );
}
