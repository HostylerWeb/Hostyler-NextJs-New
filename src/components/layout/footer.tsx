import Link from "next/link";
import { Wrap } from "@/components/layout/wrap";
import { SiteLogo } from "@/components/layout/site-logo";
import { footerNavigation } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="pb-8 pt-20">
      <Wrap>
        <div className="mb-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <SiteLogo height={80} />
            <p className="mt-4 max-w-[280px] text-sm text-muted">
              {site.legalName} builds web platforms, mobile apps, and AI-powered products for teams
              who need to ship real products, not prototypes.
            </p>
          </div>

          <FooterColumn title="Company" links={footerNavigation.company} />
          <FooterColumn title="Services" links={footerNavigation.services} />
          <FooterColumn title="Connect" links={footerNavigation.connect} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t-2.5 border-ink pt-6 text-[13px] font-semibold text-muted">
          <span>{site.copyright}</span>
          <span>{site.footerNote}</span>
        </div>
      </Wrap>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h5 className="mb-4 font-mono text-[11px] font-bold tracking-[0.08em] text-muted uppercase">
        {title}
      </h5>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14.5px] font-medium text-ink transition hover:text-violet"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
