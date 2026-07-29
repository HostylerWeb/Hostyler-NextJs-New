import nodemailer from "nodemailer";
import { env } from "@/lib/env";
import { escapeHtml, escapeHtmlMultiline } from "@/lib/html";

function baseTemplate(title: string, body: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#FBFAF5;font-family:Inter,Arial,sans-serif;color:#121214;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBFAF5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:560px;background:#ffffff;border:2.5px solid #121214;border-radius:16px;box-shadow:6px 6px 0 #121214;">
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 8px;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6C3EF4;">Hostyler</p>
                <h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;">${escapeHtml(title)}</h1>
                <div style="font-size:15px;line-height:1.6;color:#5B5C63;">${body}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
    <p><strong>${escapeHtml(input.name)}</strong> (${escapeHtml(input.email)}) submitted the contact form.</p>
    <p><strong>Project:</strong> ${escapeHtml(input.project_type)}<br/>
    <strong>Budget:</strong> ${escapeHtml(input.budget)}</p>
    ${input.message ? `<p>${escapeHtmlMultiline(input.message)}</p>` : ""}
  `;

  await sendMail({
    to: env.SMTP_TO,
    subject: `New contact from ${input.name}`,
    html: baseTemplate("New contact submission", body),
    text: `New contact from ${input.name} (${input.email})`,
  });
}

export async function sendContactAutoReply(input: { name: string; email: string }) {
  const body = `
    <p>Hi ${escapeHtml(input.name)},</p>
    <p>Thanks for reaching out to Hostyler. We received your message and will reply within one business day.</p>
    <p>— The Hostyler team</p>
  `;

  await sendMail({
    to: input.email,
    subject: "We got your message — Hostyler",
    html: baseTemplate("Thanks for getting in touch", body),
    text: `Hi ${input.name}, thanks for contacting Hostyler.`,
  });
}

function actionButton(url: string, label: string) {
  const safeUrl = escapeHtml(url);
  return `<p><a href="${safeUrl}" style="display:inline-block;padding:12px 20px;background:#6C3EF4;color:#fff;border-radius:999px;text-decoration:none;font-weight:700;">${escapeHtml(label)}</a></p>`;
}

function textLink(url: string, label: string) {
  const safeUrl = escapeHtml(url);
  return `<a href="${safeUrl}" style="font-weight:700;color:#6C3EF4;">${escapeHtml(label)}</a>`;
}

export async function sendEmailVerification(user: { name: string; email: string }, token: string) {
  const url = `${env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${encodeURIComponent(token)}`;
  const body = `
    <p>Hi ${escapeHtml(user.name)},</p>
    <p>Please verify your email to activate your Hostyler client account.</p>
    ${actionButton(url, "Verify email")}
    <p style="font-size:13px;">Or copy this link: ${escapeHtml(url)}</p>
  `;

  await sendMail({
    to: user.email,
    subject: "Verify your Hostyler email",
    html: baseTemplate("Verify your email", body),
  });
}

export async function sendPasswordReset(user: { name: string; email: string }, token: string) {
  const url = `${env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${encodeURIComponent(token)}`;
  const body = `
    <p>Hi ${escapeHtml(user.name)},</p>
    <p>We received a request to reset your password. This link expires in 1 hour.</p>
    ${actionButton(url, "Reset password")}
    <p style="font-size:13px;">If you did not request this, you can ignore this email.</p>
  `;

  await sendMail({
    to: user.email,
    subject: "Reset your Hostyler password",
    html: baseTemplate("Reset your password", body),
  });
}

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  const loginUrl = `${env.NEXT_PUBLIC_SITE_URL}/login`;
  const body = `
    <p>Hi ${escapeHtml(user.name)},</p>
    <p>Your email is verified. You can now log in to view invoices and open support tickets.</p>
    <p>${textLink(loginUrl, "Go to login")}</p>
  `;

  await sendMail({
    to: user.email,
    subject: "Welcome to Hostyler",
    html: baseTemplate("Welcome aboard", body),
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
    <p>Hi ${escapeHtml(input.clientName)},</p>
    <p>You have a new invoice from Hostyler.</p>
    <p><strong>Invoice:</strong> ${escapeHtml(input.invoiceNumber)}<br/>
    <strong>Amount due:</strong> ${escapeHtml(input.total)}<br/>
    <strong>Due date:</strong> ${escapeHtml(input.dueDate)}</p>
    ${actionButton(input.payUrl, "Pay invoice")}
    <p style="font-size:13px;">Or view in your ${textLink(input.portalUrl, "client portal")}.</p>
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Invoice ${input.invoiceNumber} from Hostyler`,
    html: baseTemplate("New invoice", body),
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
    <p>Hi ${escapeHtml(input.clientName)},</p>
    <p>We received your payment for invoice <strong>${escapeHtml(input.invoiceNumber)}</strong>.</p>
    <p><strong>Amount:</strong> ${escapeHtml(input.total)}<br/>
    <strong>Reference:</strong> ${escapeHtml(input.paymentId)}</p>
    <p>Thank you for your business.</p>
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Payment received — ${input.invoiceNumber}`,
    html: baseTemplate("Payment received", body),
  });

  await sendMail({
    to: env.SMTP_TO,
    subject: `Invoice paid: ${input.invoiceNumber}`,
    html: baseTemplate(
      "Invoice paid",
      `<p>Invoice <strong>${escapeHtml(input.invoiceNumber)}</strong> was paid (${escapeHtml(input.total)}).</p>`,
    ),
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
    <p>Hi ${escapeHtml(input.clientName)},</p>
    <p>This is a friendly reminder that invoice <strong>${escapeHtml(input.invoiceNumber)}</strong> is overdue.</p>
    <p><strong>Amount due:</strong> ${escapeHtml(input.total)}<br/>
    <strong>Due date:</strong> ${escapeHtml(input.dueDate)}</p>
    ${actionButton(input.payUrl, "Pay now")}
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Reminder: Invoice ${input.invoiceNumber} is overdue`,
    html: baseTemplate("Payment reminder", body),
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
    <p><strong>${escapeHtml(input.clientName)}</strong> opened support ticket <strong>${escapeHtml(input.ticketNumber)}</strong>.</p>
    <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p>${escapeHtmlMultiline(input.body)}</p>
    <p>${textLink(input.ticketUrl, "View ticket")}</p>
  `;

  await sendMail({
    to: env.SMTP_TO,
    subject: `New support ticket: ${input.ticketNumber}`,
    html: baseTemplate("New support ticket", content),
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
    <p>Hi ${escapeHtml(input.clientName)},</p>
    <p>There's a new reply on ticket <strong>${escapeHtml(input.ticketNumber)}</strong>: ${escapeHtml(input.subject)}</p>
    <p>${escapeHtmlMultiline(input.message)}</p>
    <p>${textLink(input.ticketUrl, "View conversation")}</p>
  `;

  await sendMail({
    to: input.clientEmail,
    subject: `Reply on ticket ${input.ticketNumber}`,
    html: baseTemplate("Support reply", body),
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
    <p><strong>${escapeHtml(input.clientName)}</strong> replied on ticket <strong>${escapeHtml(input.ticketNumber)}</strong>.</p>
    <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p>${escapeHtmlMultiline(input.message)}</p>
    <p>${textLink(input.ticketUrl, "View ticket")}</p>
  `;

  await sendMail({
    to: env.SMTP_TO,
    subject: `Client replied: ${input.ticketNumber}`,
    html: baseTemplate("Client ticket reply", body),
  });
}

export async function sendClientWelcomeInvite(input: {
  name: string;
  email: string;
  tempPassword: string;
}) {
  const loginUrl = `${env.NEXT_PUBLIC_SITE_URL}/login`;
  const body = `
    <p>Hi ${escapeHtml(input.name)},</p>
    <p>An account has been created for you on Hostyler.</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}<br/>
    <strong>Temporary password:</strong> ${escapeHtml(input.tempPassword)}</p>
    <p>Please log in and change your password in Settings.</p>
    <p>${textLink(loginUrl, "Log in")}</p>
  `;

  await sendMail({
    to: input.email,
    subject: "Your Hostyler client account",
    html: baseTemplate("Welcome to Hostyler", body),
  });
}
