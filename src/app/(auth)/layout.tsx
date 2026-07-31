import "@/styles/marketing.css";
import { AuthShell } from "@/components/auth/auth-shell";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthShell>{children}</AuthShell>;
}
