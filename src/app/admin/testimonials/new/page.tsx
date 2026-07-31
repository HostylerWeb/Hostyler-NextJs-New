import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { isAdmin } from "@/lib/permissions";

export default async function NewTestimonialPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Reviews", href: "/admin/testimonials" },
        { label: "New" },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">New review</h1>
          <p className="mt-1 text-sm text-muted">
            Add a client testimonial to the homepage carousel.
          </p>
        </div>
        <TestimonialForm mode="create" />
      </div>
    </AdminShell>
  );
}
