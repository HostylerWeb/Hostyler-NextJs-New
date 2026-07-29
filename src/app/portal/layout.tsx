import type { Metadata } from "next";
import { requirePortalUser } from "@/lib/session-user";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePortalUser();
  return children;
}
