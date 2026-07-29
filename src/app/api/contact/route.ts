import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createContactSubmission, markContactEmailFailed, markContactEmailSent, countRecentContactSubmissionsByIp } from "@/lib/repositories/contact";
import { env } from "@/lib/env";
import { sendContactAutoReply, sendContactNotification } from "@/lib/mail";
import { contactFormSchema } from "@/lib/validators/contact";

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const ip = getClientIp(request);
    const recentCount = await countRecentContactSubmissionsByIp(
      ip,
      new Date(Date.now() - 60 * 60 * 1000),
    );
    if (recentCount >= env.CONTACT_RATE_LIMIT_PER_HOUR) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const session = await auth();
    const userAgent = request.headers.get("user-agent");

    const submission = await createContactSubmission({
      name: parsed.data.name,
      email: parsed.data.email,
      project_type: parsed.data.project_type,
      budget: parsed.data.budget,
      message: parsed.data.message ?? null,
      ip_address: ip,
      user_agent: userAgent,
      user_id: session?.user?.id ?? null,
    });

    try {
      await sendContactNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        project_type: parsed.data.project_type,
        budget: parsed.data.budget,
        message: parsed.data.message,
      });
      await sendContactAutoReply({
        name: parsed.data.name,
        email: parsed.data.email,
      });
      await markContactEmailSent(submission.id);
    } catch (error) {
      await markContactEmailFailed(
        submission.id,
        error instanceof Error ? error.message : "Email failed",
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
