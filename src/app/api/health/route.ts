import { NextResponse } from "next/server";
import { verifyDatabaseConnection } from "@/lib/db";
import { env } from "@/lib/env";
import { verifySmtpConnection } from "@/lib/mail";

export async function GET(request: Request) {
  const secret = request.headers.get("x-health-secret");
  if (env.HEALTH_CHECK_SECRET && secret !== env.HEALTH_CHECK_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyDatabaseConnection();
    const smtp = await verifySmtpConnection();

    return NextResponse.json({
      ok: true,
      services: {
        database: "up",
        smtp: smtp ? "up" : "not_configured",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Health check failed",
      },
      { status: 503 },
    );
  }
}
