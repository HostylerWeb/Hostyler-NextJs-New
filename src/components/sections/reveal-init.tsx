"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

type RevealInitProps = {
  children: ReactNode;
};

export function RevealInit({ children }: RevealInitProps) {
  useReveal();

  return children;
}
