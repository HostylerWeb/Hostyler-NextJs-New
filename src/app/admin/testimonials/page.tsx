import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { TestimonialRowActions } from "@/components/admin/testimonial-row-actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { isAdmin } from "@/lib/permissions";
import { listAllTestimonials } from "@/lib/repositories/testimonials";

export default async function AdminTestimonialsPage() {
  const session = await auth();
  if (!isAdmin(session?.user)) redirect("/login");

  const testimonials = await listAllTestimonials();

  return (
    <AdminShell
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Reviews" },
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Reviews</h1>
            <p className="mt-1 text-sm text-muted">
              Client testimonials shown in the homepage carousel.
            </p>
          </div>
          <Button href="/admin/testimonials/new">New review</Button>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader scope="col">Name</TableHeader>
              <TableHeader scope="col">Role / location</TableHeader>
              <TableHeader scope="col">Slug</TableHeader>
              <TableHeader scope="col">Published</TableHeader>
              <TableHeader scope="col">Order</TableHeader>
              <TableHeader scope="col">Updated</TableHeader>
              <TableHeader scope="col">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-semibold">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    className="text-violet hover:underline"
                  >
                    {testimonial.name}
                  </Link>
                </TableCell>
                <TableCell>{testimonial.role}</TableCell>
                <TableCell>
                  <code className="text-xs">{testimonial.slug}</code>
                </TableCell>
                <TableCell>{testimonial.published ? "Yes" : "No"}</TableCell>
                <TableCell>{testimonial.sort_order}</TableCell>
                <TableCell>{formatDate(testimonial.updated_at)}</TableCell>
                <TableCell>
                  <TestimonialRowActions
                    id={testimonial.id}
                    name={testimonial.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminShell>
  );
}
