import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Hostyler",
  description: "Web, App & AI Development Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
