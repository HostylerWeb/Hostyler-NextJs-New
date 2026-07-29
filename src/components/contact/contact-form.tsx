"use client";

import { type FormEvent, useState } from "react";
import { site } from "@/content/site";
import { type ContactFormInput, contactFormSchema } from "@/lib/validators/contact";

type ContactFormProps = {
  variant?: "default" | "cta";
};

type FormState = {
  name: string;
  email: string;
  project_type: ContactFormInput["project_type"] | "";
  budget: ContactFormInput["budget"] | "";
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  project_type: "",
  budget: "",
  message: "",
  website: "",
};

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const parsed = contactFormSchema.safeParse({
      name: form.name,
      email: form.email,
      project_type: form.project_type || undefined,
      budget: form.budget || undefined,
      message: form.message || undefined,
      website: form.website,
    });

    if (!parsed.success) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setForm(initialState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  const formClassName = variant === "cta" ? "cta-form" : "cta-form";

  if (status === "success") {
    return (
      <div className={formClassName} role="status">
        <p className="form-full text-center font-semibold text-ink">
          Thanks — we&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Jordan Reyes"
          autoComplete="name"
          required
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Work email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="contact-project-type">Project type</label>
        <select
          id="contact-project-type"
          name="project_type"
          required
          value={form.project_type}
          onChange={(event) =>
            updateField("project_type", event.target.value as FormState["project_type"])
          }
        >
          <option value="" disabled>
            What are you building?
          </option>
          <option value="web">Web platform or site</option>
          <option value="app">Mobile or cross-platform app</option>
          <option value="ai">AI feature or automation</option>
          <option value="multiple">A few of the above</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-budget">Budget / timeline</label>
        <select
          id="contact-budget"
          name="budget"
          required
          value={form.budget}
          onChange={(event) => updateField("budget", event.target.value as FormState["budget"])}
        >
          <option value="" disabled>
            Select a range
          </option>
          <option value="under_25k">Under $25k · ASAP</option>
          <option value="range_25_50k">$25k–$50k · 1–2 months</option>
          <option value="range_50_100k">$50k–$100k · 2–4 months</option>
          <option value="range_100k_plus">$100k+ · Ongoing team</option>
          <option value="exploring">Just exploring</option>
        </select>
      </div>
      <div className="field form-full">
        <label htmlFor="contact-message">
          Project details <span style={{ fontWeight: 500, opacity: 0.8 }}>(optional)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell us what you're building, timeline, and any links…"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {status === "error" ? (
        <p className="form-full text-sm font-semibold text-coral" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="cta-actions form-full">
        <button type="submit" className="btn btn-ghost" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send it over"}
        </button>
        <a
          href={`mailto:${site.email}?subject=Project%20call%20request`}
          className="btn btn-primary"
        >
          Book a 20-min call
        </a>
      </div>
    </form>
  );
}
