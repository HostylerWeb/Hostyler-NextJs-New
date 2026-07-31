export type LegalSubsection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: LegalSubsection[];
};

export type LegalDocument = {
  title: string;
  lastUpdated: string;
  intro?: string[];
  sections: LegalSection[];
  closing?: string[];
};
