"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import "@/styles/marketing.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main id="main-content" className="site-main">
        <Section pageTop>
          <Wrap className="max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              500
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Something went wrong
            </h1>
            <p className="mt-4 text-lg text-muted">
              An unexpected error occurred. Please try again, or contact us if the problem
              persists.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button type="button" onClick={reset} className="btn btn-primary">
                Try again
              </button>
              <Link href="/" className="btn btn-secondary">
                Back to home
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact support
              </Link>
            </div>
          </Wrap>
        </Section>
      </main>
      <Footer />
    </>
  );
}
