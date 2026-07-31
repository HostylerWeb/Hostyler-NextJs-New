import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import { escapeHtml, escapeHtmlMultiline } from "@/lib/html";

const brand = {
  paper: "#FBFAF5",
  paper2: "#F1EEE4",
  ink: "#121214",
  muted: "#5B5C63",
  violet: "#6C3EF4",
  violetTint: "#EAE1FE",
  coral: "#FF5A36",
  coralTint: "#FFE4DB",
  lime: "#C6FF4D",
  limeTint: "#EEFCCB",
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
  logoUrl: `${env.NEXT_PUBLIC_SITE_URL}/logo.png`,
} as const;

type EmailTemplateInput = {
  title: string;
  preheader?: string;
  body: string;
  accent?: "violet" | "coral" | "lime";
};

function accentColor(accent: EmailTemplateInput["accent"]) {
  switch (accent) {
    case "coral":
      return brand.coralTint;
    case "lime":
      return brand.limeTint;
    default:
      return brand.violetTint;
  }
}

function emailTemplate({ title, preheader, body, accent = "violet" }: EmailTemplateInput) {
  const headerTint = accentColor(accent);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${brand.paper};font-family:Inter,Arial,sans-serif;color:${brand.ink};">
    ${
      preheader
        ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>`
        : ""
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.paper};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:2.5px solid ${brand.ink};border-radius:22px;overflow:hidden;background:#ffffff;box-shadow:6px 6px 0 ${brand.ink};">
            <tr>
              <td style="padding:24px 28px;background:${headerTint};border-bottom:2.5px solid ${brand.ink};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <img src="${brand.logoUrl}" alt="Hostyler" width="148" height="49" style="display:block;width:148px;height:auto;border:0;" />
                    </td>
                    <td align="right" valign="middle">
                      <span style="display:inline-block;padding:6px 12px;border:2px solid ${brand.ink};border-radius:999px;background:${brand.lime};font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.ink};">
                        Hostyler
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 28px;">
                <p style="margin:0 0 10px;font-family:'Space Mono',monospace;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.violet};">
                  ${escapeHtml(title)}
                </p>
                <div style="font-size:15px;line-height:1.65;color:${brand.muted};">
                  ${body}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 24px;border-top:2px solid ${brand.paper2};background:${brand.paper};">
                <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:${brand.muted};">
                  Hostyler Studio · Web, App &amp; AI Development
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:${brand.muted};">
                  <a href="${brand.siteUrl}" style="color:${brand.violet};font-weight:700;text-decoration:none;">hostyler.dev</a>
                  ·
                  <a href="mailto:hello@hostyler.dev" style="color:${brand.violet};font-weight:700;text-decoration:none;">hello@hostyler.dev</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function paragraph(text: string) {
  return `<p style="margin:0 0 16px;color:${brand.ink};">${text}</p>`;
}

function actionButton(url: string, label: string) {
  const safeUrl = escapeHtml(url);
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">
    <tr>
      <td style="border-radius:999px;background:${brand.violet};border:2.5px solid ${brand.ink};box-shadow:4px 4px 0 ${brand.ink};">
        <a href="${safeUrl}" style="display:inline-block;padding:14px 24px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">
          ${escapeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`;
}

function textLink(url: string, label: string) {
  const safeUrl = escapeHtml(url);
  return `<a href="${safeUrl}" style="font-weight:700;color:${brand.violet};text-decoration:none;">${escapeHtml(label)}</a>`;
}

function infoPanel(content: string, tone: "violet" | "coral" | "lime" = "violet") {
  const background = accentColor(tone);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">
    <tr>
      <td style="padding:16px 18px;border:2px solid ${brand.ink};border-radius:16px;background:${background};color:${brand.ink};font-size:14px;line-height:1.6;">
        ${content}
      </td>
    </tr>
  </table>`;
}

function otpCodeBox(code: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 20px;">
    <tr>
      <td align="center" style="padding:20px 18px;border:2.5px solid ${brand.ink};border-radius:16px;background:${brand.paper};box-shadow:4px 4px 0 ${brand.ink};">
        <p style="margin:0 0 8px;font-family:'Space Mono',monospace;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${brand.muted};">
          Your reset code
        </p>
        <p style="margin:0;font-family:'Space Mono',monospace;font-size:34px;font-weight:700;letter-spacing:0.28em;color:${brand.ink};">
          ${escapeHtml(code)}
        </p>
      </td>
    </tr>
  </table>`;
}

function getTransport() {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
}

type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendMail(input: SendMailInput): Promise<void> {
  const transport = getTransport();

  if (!transport) {
    if (env.NODE_ENV === "development") {
      console.info("[mail:dev]", input.subject, "→", input.to);
      return;
    }
    throw new Error("SMTP is not configured");
  }

  await transport.sendMail({
    from: env.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}

export async function verifySmtpConnection(): Promise<boolean> {
  const transport = getTransport();
  if (!transport) return false;
  try {
    await transport.verify();
    return true;
  } catch {
    return false;
  }
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message?: string | null;
}) {
  const body = `
    ${paragraph(`<strong>${escapeHtml(input.name)}</strong> (${escapeHtml(input.email)}) submitted the contact form.`)}
    ${infoPanel(
      `<strong>Project:</strong> ${escapeHtml(input.project_type)}<br/>
      <strong>Budget:</strong> ${escapeHtml(input.budget)}${
        input.message
          ? `<br/><br/>${escapeHtmlMultiline(input.message)}`
          : ""
      }`,
      "lime",
    )}
  `;

  await sendMail({
    to: env.SMTP_TO,
    subject: `New contact from ${input.name}`,
    html: emailTemplate({
      title: "New contact submission",
      preheader: `${input.name} submitted the contact form`,
      body,
      accent: "lime",
    }),
    text: `New contact from ${input.name} (${input.email})`,
  });
}

export async function sendContactAutoReply(input: { name: string; email: string }) {
  const body = `
    ${paragraph(`Hi ${escapeHtml(input.name)},`)}
    ${paragraph("Thanks for reaching out to Hostyler. We received your message and will reply within one business day.")}
    ${paragraph("— The Hostyler team")}
  `;

  await sendMail({
    to: input.email,
    subject: "We got your message — Hostyler",
    html: emailTemplate({
      title: "Thanks for getting in touch",
      preheader: "We received your message and will reply soon",
      body,
      accent: "violet",
    }),
    text: `Hi ${input.name}, thanks for contacting Hostyler.`,
  });
}

export async function sendEmailVerification(user: { name: string; email: string }, token: string) {
  const url = `${env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${encodeURIComponent(token)}`;
  const body = `
    ${paragraph(`Hi ${escapeHtml(user.name)},`)}
    ${paragraph("Please verify your email to activate your Hostyler client account.")}
    ${actionButton(url, "Verify email")}
    <p style="margin:0;font-size:13px;line-height:1.6;color:${brand.muted};">Or copy this link:<br/>
    <span style="word-break:break-all;">${escapeHtml(url)}</span></p>
  `;

  await sendMail({
    to: user.email,
    subject: "Verify your Hostyler email",
    html: emailTemplate({
      title: "Verify your email",
      preheader: "Activate your Hostyler client account",
      body,
      accent: "violet",
    }),
  });
}

export async function sendPasswordResetOtp(user: { name: string; email: string }, code: string) {
  const resetUrl = `${env.NEXT_PUBLIC_SITE_URL}/forgot-password`;
  const body = `
    ${paragraph(`Hi ${escapeHtml(user.name)},`)}
    ${paragraph("Use this code to reset your Hostyler password. It expires in 15 minutes.")}
    ${otpCodeBox(code)}
    ${paragraph(`Enter the code on the ${textLink(resetUrl, "password reset page")}.`)}
    ${paragraph(`If you did not request this, you can safely ignore this email.`)}
  `;

  await sendMail({
    to: user.email,
    subject: `${code} is your Hostyler password reset code`,
    html: emailTemplate({
      title: "Password reset code",
      preheader: `Your Hostyler reset code is ${code}`,
      body,
      accent: "coral",
    }),
    text: `Your Hostyler password reset code is ${code}. It expires in 15 minutes.`,
  });
}

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  const loginUrl = `${env.NEXT_PUBLIC_SITE_URL}/login`;
  const body = `
    ${paragraph(`Hi ${escapeHtml(user.name)},`)}
    ${paragraph("Your email is verified. You can now log in to view invoices and open support tickets.")}
    ${actionButton(loginUrl, "Go to login")}
  `;

  await sendMail({
    to: user.email,
    subject: "Welcome to Hostyler",
    html: emailTemplate({
      title: "Welcome aboard",
      preheader: "Your Hostyler client account is ready",
      body,
      accent: "lime",
    }),
  });
}

export async function sendInvoiceEmail(input: {
  invoiceNumber: string;
  total: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  payUrl: string;
  portalUrl: string;
}) {
  const body = `
    ${paragraph(`Hi ${escapeHtml(input.clientName)},`)}
    ${paragraph("You have a new invoice from Hostyler.")}
    ${infoPanel(
      `<strong>Invoice:</strong> ${escapeHtml(input.invoiceNumber)}<br/>
      <strong>Amount due:</strong> ${escapeHtml(input.total)}<br/>
      <strong>Due date:</strong> ${escapeHtml(input.dueDate)}`,
      "violet",
    )}
    ${actionButton(input.payUrl, "Pay invoice")}
    <p style="margin:0;font-size:13px;line-height:1.6;color:${brand.muted};">
      Or view it in your ${textLink(input.portalUrl, "client portal")}.
    </p>
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Invoice ${input.invoiceNumber} from Hostyler`,
    html: emailTemplate({
      title: "New invoice",
      preheader: `Invoice ${input.invoiceNumber} is ready to pay`,
      body,
      accent: "violet",
    }),
  });
}

export async function sendInvoicePaidReceipt(input: {
  invoiceNumber: string;
  total: string;
  clientName: string;
  clientEmail: string;
  paymentId: string;
}) {
  const body = `
    ${paragraph(`Hi ${escapeHtml(input.clientName)},`)}
    ${paragraph(`We received your payment for invoice <strong>${escapeHtml(input.invoiceNumber)}</strong>.`)}
    ${infoPanel(
      `<strong>Amount:</strong> ${escapeHtml(input.total)}<br/>
      <strong>Reference:</strong> ${escapeHtml(input.paymentId)}`,
      "lime",
    )}
    ${paragraph("Thank you for your business.")}
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Payment received — ${input.invoiceNumber}`,
    html: emailTemplate({
      title: "Payment received",
      preheader: `Payment received for invoice ${input.invoiceNumber}`,
      body,
      accent: "lime",
    }),
  });

  await sendMail({
    to: env.SMTP_TO,
    subject: `Invoice paid: ${input.invoiceNumber}`,
    html: emailTemplate({
      title: "Invoice paid",
      preheader: `Invoice ${input.invoiceNumber} was paid`,
      body: paragraph(
        `Invoice <strong>${escapeHtml(input.invoiceNumber)}</strong> was paid (${escapeHtml(input.total)}).`,
      ),
      accent: "lime",
    }),
  });
}

export async function sendInvoiceReminder(input: {
  invoiceNumber: string;
  total: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  payUrl: string;
}) {
  const body = `
    ${paragraph(`Hi ${escapeHtml(input.clientName)},`)}
    ${paragraph(`This is a friendly reminder that invoice <strong>${escapeHtml(input.invoiceNumber)}</strong> is overdue.`)}
    ${infoPanel(
      `<strong>Amount due:</strong> ${escapeHtml(input.total)}<br/>
      <strong>Due date:</strong> ${escapeHtml(input.dueDate)}`,
      "coral",
    )}
    ${actionButton(input.payUrl, "Pay now")}
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Reminder: Invoice ${input.invoiceNumber} is overdue`,
    html: emailTemplate({
      title: "Payment reminder",
      preheader: `Invoice ${input.invoiceNumber} is overdue`,
      body,
      accent: "coral",
    }),
  });
}

export async function sendNewTicketNotificationToStaff(input: {
  ticketNumber: string;
  subject: string;
  clientName: string;
  body: string;
  ticketUrl: string;
}) {
  const content = `
    ${paragraph(`<strong>${escapeHtml(input.clientName)}</strong> opened support ticket <strong>${escapeHtml(input.ticketNumber)}</strong>.`)}
    ${infoPanel(
      `<strong>Subject:</strong> ${escapeHtml(input.subject)}<br/><br/>${escapeHtmlMultiline(input.body)}`,
      "violet",
    )}
    ${paragraph(textLink(input.ticketUrl, "View ticket"))}
  `;

  await sendMail({
    to: env.SMTP_TO,
    subject: `New support ticket: ${input.ticketNumber}`,
    html: emailTemplate({
      title: "New support ticket",
      preheader: `${input.clientName} opened ticket ${input.ticketNumber}`,
      body: content,
      accent: "violet",
    }),
  });
}

export async function sendTicketReplyToClient(input: {
  ticketNumber: string;
  subject: string;
  clientName: string;
  clientEmail: string;
  message: string;
  ticketUrl: string;
}) {
  const body = `
    ${paragraph(`Hi ${escapeHtml(input.clientName)},`)}
    ${paragraph(`There's a new reply on ticket <strong>${escapeHtml(input.ticketNumber)}</strong>: ${escapeHtml(input.subject)}`)}
    ${infoPanel(escapeHtmlMultiline(input.message), "lime")}
    ${paragraph(textLink(input.ticketUrl, "View conversation"))}
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Reply on ticket ${input.ticketNumber}`,
    html: emailTemplate({
      title: "Support reply",
      preheader: `New reply on ticket ${input.ticketNumber}`,
      body,
      accent: "lime",
    }),
  });
}

export async function sendTicketReplyToStaff(input: {
  ticketNumber: string;
  subject: string;
  clientName: string;
  message: string;
  ticketUrl: string;
}) {
  const body = `
    ${paragraph(`<strong>${escapeHtml(input.clientName)}</strong> replied on ticket <strong>${escapeHtml(input.ticketNumber)}</strong>.`)}
    ${infoPanel(
      `<strong>Subject:</strong> ${escapeHtml(input.subject)}<br/><br/>${escapeHtmlMultiline(input.message)}`,
      "coral",
    )}
    ${paragraph(textLink(input.ticketUrl, "View ticket"))}
  `;

  await sendMail({
    to: env.SMTP_TO,
    subject: `Client replied: ${input.ticketNumber}`,
    html: emailTemplate({
      title: "Client ticket reply",
      preheader: `${input.clientName} replied on ticket ${input.ticketNumber}`,
      body,
      accent: "coral",
    }),
  });
}

export async function sendClientWelcomeInvite(input: {
  name: string;
  email: string;
  password: string;
  isTemporary?: boolean;
  subject?: string;
  intro?: string;
}) {
  const loginUrl = `${env.NEXT_PUBLIC_SITE_URL}/login`;
  const passwordLabel = input.isTemporary ? "Temporary password" : "Password";
  const intro =
    input.intro ?? "An account has been created for you on Hostyler.";
  const body = `
    ${paragraph(`Hi ${escapeHtml(input.name)},`)}
    ${paragraph(intro)}
    ${infoPanel(
      `<strong>Email:</strong> ${escapeHtml(input.email)}<br/>
      <strong>${passwordLabel}:</strong> ${escapeHtml(input.password)}`,
      "violet",
    )}
    ${paragraph(`Please log in${input.isTemporary ? " and change your password in Settings" : ""}.`)}
    ${actionButton(loginUrl, "Log in")}
  `;

  await sendMail({
    to: input.email,
    subject: input.subject ?? "Your Hostyler client account",
    html: emailTemplate({
      title: "Welcome to Hostyler",
      preheader: "Your Hostyler client account is ready",
      body,
      accent: "violet",
    }),
  });
}
