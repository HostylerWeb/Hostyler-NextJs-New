import { Wrap } from "@/components/layout/wrap";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-paper px-4 py-24">
      <Wrap className="mx-auto max-w-md">{children}</Wrap>
    </div>
  );
}
