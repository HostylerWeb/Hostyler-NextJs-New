import { competitionGoCaseStudy } from "@/content/case-studies/competitiongo";
import { maxGiveawaysCaseStudy } from "@/content/case-studies/max-giveaways";
import { sanjhaChulhaCaseStudy } from "@/content/case-studies/sanjha-chulha";
import { hookedOnlineCaseStudy } from "@/content/case-studies/hooked-online";
import { bonniePlantsCaseStudy } from "@/content/case-studies/bonnie-plants";
import { nadiaAmokraneCaseStudy } from "@/content/case-studies/nadia-amokrane";
import { socialiteLifeCaseStudy } from "@/content/case-studies/socialite-life";
import { theLashHouseCaseStudy } from "@/content/case-studies/the-lash-house";
import type { CaseStudyDetail } from "@/content/case-studies/types";

const caseStudyDetails: Record<string, CaseStudyDetail> = {
  competitiongo: competitionGoCaseStudy,
  "max-giveaways": maxGiveawaysCaseStudy,
  "sanjha-chulha": sanjhaChulhaCaseStudy,
  "the-lash-house": theLashHouseCaseStudy,
  "hooked-online": hookedOnlineCaseStudy,
  "socialite-life": socialiteLifeCaseStudy,
  "bonnie-plants": bonniePlantsCaseStudy,
  "nadia-amokrane": nadiaAmokraneCaseStudy,
};

export function getCaseStudyDetail(slug: string): CaseStudyDetail | null {
  return caseStudyDetails[slug] ?? null;
}
