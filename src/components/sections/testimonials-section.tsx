import { listPublishedTestimonials } from "@/lib/repositories/testimonials";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

export async function TestimonialsSection() {
  const testimonials = await listPublishedTestimonials();

  return (
    <TestimonialsCarousel
      testimonials={testimonials.map((testimonial) => ({
        id: testimonial.id,
        quote: testimonial.quote,
        name: testimonial.name,
        role: testimonial.role,
        avatar_url: testimonial.avatar_url,
      }))}
    />
  );
}
