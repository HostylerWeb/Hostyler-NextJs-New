export type CaseStudyStat = {
  metric: string;
  label: string;
};

export type CaseStudyFeature = {
  title: string;
  description: string;
  icon: "ticket" | "wallet" | "draw" | "instant" | "referral" | "loyalty" | "account" | "admin" | "compliance" | "spin";
};

export type CaseStudyStep = {
  step: string;
  title: string;
  description: string;
};

export type CaseStudyScreenshot = {
  src: string;
  alt: string;
  caption: string;
  title: string;
  description: string;
};

export type CaseStudyDetail = {
  slug: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  heroAccent?: string;
  overviewLead: string;
  overviewBody: string[];
  challenge: {
    title: string;
    paragraphs: string[];
  };
  solution: {
    title: string;
    paragraphs: string[];
  };
  stats: CaseStudyStat[];
  screenshots?: CaseStudyScreenshot[];
  featureBandMatch?: string;
  sections?: {
    showcaseEyebrow?: string;
    showcaseTitle?: string;
    showcaseIntro?: string;
    featuresEyebrow?: string;
    featuresTitle?: string;
    featuresIntro?: string;
    journeyEyebrow?: string;
    journeyTitle?: string;
    journeyIntro?: string;
    operationsTitle?: string;
    operationsIntro?: string;
    techIntro?: string;
    ctaTitle?: string;
    ctaIntro?: string;
  };
  features: CaseStudyFeature[];
  playerSteps: CaseStudyStep[];
  adminHighlights: string[];
  techStack: string[];
  results: CaseStudyStat[];
  quote?: {
    text: string;
    attribution: string;
  };
};
