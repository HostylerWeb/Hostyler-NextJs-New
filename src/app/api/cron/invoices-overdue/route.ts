import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { markInvoicesOverdue } from "@/lib/repositories/invoices";

export async function GET(request: Request) {
  const cronSecret = env.CRON_SECRET ?? env.HEALTH_CHECK_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const count = await markInvoicesOverdue();
  return NextResponse.json({ updated: count });
}
