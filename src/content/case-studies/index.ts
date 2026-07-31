import { competitionGoCaseStudy } from "@/content/case-studies/competitiongo";
import type { CaseStudyDetail } from "@/content/case-studies/types";

const caseStudyDetails: Record<string, CaseStudyDetail> = {
  competitiongo: competitionGoCaseStudy,
};

export function getCaseStudyDetail(slug: string): CaseStudyDetail | null {
  return caseStudyDetails[slug] ?? null;
}
