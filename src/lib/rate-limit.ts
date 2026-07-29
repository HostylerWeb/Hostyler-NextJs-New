import { prisma } from "@/lib/db";

const CLEANUP_AGE_MS = 24 * 60 * 60 * 1000;

async function cleanupOldEvents(): Promise<void> {
  await prisma.rate_limit_events.deleteMany({
    where: {
      created_at: { lt: new Date(Date.now() - CLEANUP_AGE_MS) },
    },
  });
}

export async function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Date.now();
  const since = new Date(now - windowMs);

  const count = await prisma.rate_limit_events.count({
    where: {
      bucket_key: key,
      created_at: { gte: since },
    },
  });

  if (count >= limit) {
    const oldest = await prisma.rate_limit_events.findFirst({
      where: {
        bucket_key: key,
        created_at: { gte: since },
      },
      orderBy: { created_at: "asc" },
      select: { created_at: true },
    });

    return {
      allowed: false,
      remaining: 0,
      resetAt: oldest
        ? oldest.created_at.getTime() + windowMs
        : now + windowMs,
    };
  }

  await prisma.rate_limit_events.create({
    data: { bucket_key: key },
  });

  if (Math.random() < 0.05) {
    void cleanupOldEvents();
  }

  return {
    allowed: true,
    remaining: limit - count - 1,
    resetAt: now + windowMs,
  };
}

export async function getRequestIp(): Promise<string> {
  const { headers } = await import("next/headers");
  const headerList = await headers();

  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown"
  );
}
