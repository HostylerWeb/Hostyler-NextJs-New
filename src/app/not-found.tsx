import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Wrap } from "@/components/layout/wrap";
import "@/styles/marketing.css";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Section className="pt-40">
          <Wrap className="max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              404
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-lg text-muted">
              The page you are looking for does not exist or may have moved.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/" className="btn btn-primary">
                Back to home
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact us
              </Link>
            </div>
          </Wrap>
        </Section>
      </main>
      <Footer />
    </>
  );
}
