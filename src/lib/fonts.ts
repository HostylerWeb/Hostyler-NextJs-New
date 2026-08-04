import { Inter, Space_Mono, Unbounded } from "next/font/google";

export const fontDisplay = Unbounded({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const fontMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;
