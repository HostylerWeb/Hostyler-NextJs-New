import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getTestimonialForAdmin } from "@/lib/actions/testimonials";
import { isAdmin } from "@/lib/permissions";

type Props = { params: Promise<{ id: string }> };

export default async function AdminTestimonialDetailPage({ params }: Props) {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const { id } = await params;
  const testimonial = await getTestimonialForAdmin(id);
  if (!testimonial) notFound();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Reviews", href: "/admin/testimonials" },
        { label: testimonial.name },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">Edit review</h1>
          <p className="mt-1 text-sm text-muted">{testimonial.name}</p>
        </div>
        <TestimonialForm
          mode="edit"
          testimonialId={testimonial.id}
          defaultValues={testimonial}
        />
      </div>
    </AdminShell>
  );
}
