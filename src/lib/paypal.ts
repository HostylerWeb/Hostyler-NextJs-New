import { createHash } from "node:crypto";
import { env } from "@/lib/env";

const paypalApiBase =
  env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

let cachedToken: { token: string; expiresAt: number } | null = null;

export function getPayPalApiBase() {
  return paypalApiBase;
}

export function isPayPalConfigured() {
  return Boolean(env.PAYPAL_CLIENT_ID && env.PAYPAL_CLIENT_SECRET);
}

export async function getAccessToken(): Promise<string> {
  if (!isPayPalConfigured()) {
    throw new Error("PayPal is not configured");
  }

  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const credentials = Buffer.from(
    `${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch(`${paypalApiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("PayPal authentication failed");
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

export type CreatePayPalOrderInput = {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
};

export async function createPayPalOrder(input: CreatePayPalOrderInput) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${paypalApiBase}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: input.invoiceId,
          custom_id: input.invoiceId,
          description: `Invoice ${input.invoiceNumber}`,
          amount: {
            currency_code: input.currency,
            value: input.amount.toFixed(2),
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PayPal create order failed: ${error}`);
  }

  return response.json() as Promise<{ id: string; status: string }>;
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${paypalApiBase}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PayPal capture failed: ${error}`);
  }

  return response.json() as Promise<{
    id: string;
    status: string;
    purchase_units: Array<{
      payments?: {
        captures?: Array<{
          id: string;
          status: string;
          amount: { currency_code: string; value: string };
        }>;
      };
    }>;
    payer?: { email_address?: string };
  }>;
}

export async function verifyWebhookSignature(
  headers: Headers,
  body: string,
): Promise<boolean> {
  if (!env.PAYPAL_WEBHOOK_ID) {
    return env.NODE_ENV === "development";
  }

  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");

  if (
    !transmissionId ||
    !transmissionTime ||
    !certUrl ||
    !authAlgo ||
    !transmissionSig
  ) {
    return false;
  }

  const accessToken = await getAccessToken();
  const response = await fetch(
    `${paypalApiBase}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: env.PAYPAL_WEBHOOK_ID,
        webhook_event: JSON.parse(body),
      }),
    },
  );

  if (!response.ok) return false;

  const result = (await response.json()) as { verification_status: string };
  return result.verification_status === "SUCCESS";
}

export function webhookEventId(body: string): string {
  return createHash("sha256").update(body).digest("hex");
}
