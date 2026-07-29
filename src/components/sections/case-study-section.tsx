import Image from "next/image";
import { Button } from "@/components/ui/button";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

const northstarStats = [
  { value: "68%", label: "Faster load time" },
  { value: "3.2x", label: "Analyst throughput" },
  { value: "6 wks", label: "To first launch" },
] as const;

const caseDetails = [
  {
    title: "The problem",
    body: "Northstar's analysts were exporting data to spreadsheets because the legacy dashboard was slow, static, and impossible to trust for real-time decisions.",
  },
  {
    title: "What we built",
    body: "A Next.js analytics platform on top of their existing warehouse, with role-based views, live charts, and AI summaries that cite the underlying data.",
  },
  {
    title: "Why it worked",
    body: "No data migration, a six-week first launch, and a team that could iterate in production without waiting on a vendor for every small change.",
  },
] as const;

const miniCases = [
  {
    id: "case-loop",
    title: "Loop Health",
    description: "Patient-clinician app shipped on iOS, Android, and web in 8 weeks.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80",
    alt: "Loop Health app screens",
  },
  {
    id: "case-fieldnote",
    title: "Fieldnote",
    description: "Voice-to-report AI that cut field reporting time by 62%.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80",
    alt: "Fieldnote AI workflow",
  },
  {
    id: "case-currency",
    title: "Currency Co.",
    description: "Headless commerce rebuild with 68% faster page loads.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    alt: "Currency Co. storefront",
  },
] as const;

export function CaseStudySection() {
  return (
    <section className="section wrap" id="case-study" style={{ paddingTop: 0 }}>
      <div className="head reveal">
        <span className="eyebrow-chip">
          <i />
          Featured project
        </span>
        <h2>Inside the Northstar rebuild.</h2>
        <p>A closer look at one build, from the first call to production traffic.</p>
      </div>

      <div className="case-panel reveal">
        <div className="case-visual">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80"
            alt="Northstar Finance dashboard screenshot"
            width={1000}
            height={320}
            loading="lazy"
          />
        </div>
        <div className="case-body">
          <span className="pkg-tag">WEB · AI INSIGHTS</span>
          <div className="case-stats">
            {northstarStats.map((stat) => (
              <div key={stat.label} className="case-stat">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p>
            Northstar&apos;s reporting tool was a legacy dashboard that analysts avoided. We rebuilt
            it as a real-time analytics platform with AI-generated summaries on top of their
            existing data warehouse — no migration required.
          </p>
          <div className="case-quote">
            &quot;Our analysts stopped exporting to spreadsheets the week this shipped.&quot;
            <span>— Dana Whitfield, Founder</span>
          </div>
          <Button href="#case-study-detail" variant="ghost" className="btn btn-ghost">
            Read the full case study
            <ArrowIcon />
          </Button>
        </div>
      </div>

      <div className="case-detail reveal" id="case-study-detail">
        <div className="case-detail-grid">
          {caseDetails.map((detail) => (
            <div key={detail.title}>
              <h4>{detail.title}</h4>
              <p>{detail.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="case-shot reveal">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
          alt="Northstar platform interface detail"
          width={1400}
          height={280}
          loading="lazy"
        />
      </div>

      <div className="mini-cases">
        {miniCases.map((item) => (
          <article key={item.id} className="mini-case reveal" id={item.id}>
            <Image src={item.image} alt={item.alt} width={700} height={140} loading="lazy" />
            <div className="mini-case-body">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
