import type { LegalDocument } from "@/content/legal/types";

const EMAIL_PATTERN = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

function renderTextWithEmailLinks(text: string) {
  const parts = text.split(EMAIL_PATTERN);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <a key={index} href={`mailto:${part}`}>
          {part}
        </a>
      );
    }

    return part;
  });
}

function LegalParagraph({ text }: { text: string }) {
  return <p>{renderTextWithEmailLinks(text)}</p>;
}

function LegalList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{renderTextWithEmailLinks(item)}</li>
      ))}
    </ul>
  );
}

export function LegalDocumentView({ document }: { document: LegalDocument }) {
  return (
    <article className="legal-document">
      <header className="legal-document__header">
        <h1>{document.title}</h1>
        <p className="legal-document__updated">Last updated: {document.lastUpdated}</p>
      </header>

      {document.intro?.map((paragraph) => (
        <LegalParagraph key={paragraph} text={paragraph} />
      ))}

      {document.sections.map((section) => (
        <section key={section.title} className="legal-document__section">
          <h2>{section.title}</h2>

          {section.paragraphs?.map((paragraph) => (
            <LegalParagraph key={paragraph} text={paragraph} />
          ))}

          {section.list ? <LegalList items={section.list} /> : null}

          {section.subsections?.map((subsection) => (
            <div key={subsection.title} className="legal-document__subsection">
              <h3>{subsection.title}</h3>

              {subsection.paragraphs?.map((paragraph) => (
                <LegalParagraph key={paragraph} text={paragraph} />
              ))}

              {subsection.list ? <LegalList items={subsection.list} /> : null}
            </div>
          ))}
        </section>
      ))}

      {document.closing?.map((paragraph) => (
        <LegalParagraph key={paragraph} text={paragraph} />
      ))}
    </article>
  );
}
