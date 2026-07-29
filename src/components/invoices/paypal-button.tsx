"use client";

import dynamic from "next/dynamic";
import { Alert } from "@/components/ui/alert";

const PayPalButtons = dynamic(
  () => import("./paypal-buttons-inner").then((mod) => mod.PayPalButtonsInner),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-muted" role="status">
        Loading PayPal…
      </p>
    ),
  },
);

type PayPalCheckoutProps = {
  invoiceId: string;
  payToken?: string;
  clientId?: string;
  currency?: string;
};

export function PayPalCheckout({
  invoiceId,
  payToken,
  clientId,
  currency = "USD",
}: PayPalCheckoutProps) {
  const paypalClientId = clientId ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!paypalClientId) {
    return (
      <Alert variant="error">
        PayPal is not configured. Contact support to complete payment.
      </Alert>
    );
  }

  return (
    <PayPalButtons
      invoiceId={invoiceId}
      payToken={payToken}
      clientId={paypalClientId}
      currency={currency}
    />
  );
}
