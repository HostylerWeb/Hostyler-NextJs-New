import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export async function tryRecordWebhookEvent(
  provider: string,
  eventId: string,
  eventType: string,
): Promise<boolean> {
  try {
    await prisma.webhook_events.create({
      data: {
        provider,
        event_id: eventId,
        event_type: eventType,
      },
    });
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return false;
    }
    throw error;
  }
}
