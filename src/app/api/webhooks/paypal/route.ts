import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/paypal";
import {
  getPaymentByProviderOrderId,
  markPaymentCompleted,
  markPaymentFailed,
  updatePaymentStatus,
} from "@/lib/repositories/payments";

export async function POST(request: Request) {
  const body = await request.text();

  const verified = await verifyWebhookSignature(request.headers, body);
  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body) as {
    event_type: string;
    resource: {
      id?: string;
      supplementary_data?: {
        related_ids?: { order_id?: string };
      };
      amount?: { value: string; currency_code: string };
    };
  };

  try {
    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const orderId =
        event.resource.supplementary_data?.related_ids?.order_id;
      const captureId = event.resource.id;

      if (orderId && captureId) {
        const payment = await getPaymentByProviderOrderId(orderId);
        if (payment && payment.status !== "completed") {
          await markPaymentCompleted(orderId, {
            provider_capture_id: captureId,
            raw_response: event as unknown as object,
          });
        }
      }
    }

    if (
      event.event_type === "PAYMENT.CAPTURE.DENIED" ||
      event.event_type === "PAYMENT.CAPTURE.DECLINED"
    ) {
      const orderId =
        event.resource.supplementary_data?.related_ids?.order_id;
      if (orderId) {
        const payment = await getPaymentByProviderOrderId(orderId);
        if (payment && payment.status === "pending") {
          await markPaymentFailed(orderId, event as unknown as object);
        }
      }
    }

    if (event.event_type === "PAYMENT.CAPTURE.REFUNDED") {
      const captureId = event.resource.id;
      if (captureId) {
        const { prisma } = await import("@/lib/db");
        const payment = await prisma.payments.findFirst({
          where: { provider_capture_id: captureId },
        });
        if (payment) {
          await updatePaymentStatus(payment.id, "refunded", {
            raw_response: event as unknown as object,
          });
        }
      }
    }
  } catch (error) {
    console.error("[paypal:webhook]", error);
  }

  return NextResponse.json({ received: true });
}
