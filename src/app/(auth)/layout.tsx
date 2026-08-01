import "@/styles/marketing.css";
import { AuthShell } from "@/components/auth/auth-shell";
import { ScrollToTopOnNavigate } from "@/components/layout/scroll-to-top-on-navigate";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToTopOnNavigate />
      <AuthShell>{children}</AuthShell>
    </>
  );
}
