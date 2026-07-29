"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";

type PayPalButtonsInnerProps = {
  invoiceId: string;
  payToken?: string;
  clientId: string;
  currency: string;
};

export function PayPalButtonsInner({
  invoiceId,
  payToken,
  clientId,
  currency,
}: PayPalButtonsInnerProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <div>
      {error ? <Alert variant="error">{error}</Alert> : null}
      {success ? (
        <Alert variant="success">Payment successful. Thank you!</Alert>
      ) : (
        <PayPalScriptProvider
          options={{
            clientId,
            currency,
            intent: "capture",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical", label: "pay" }}
            aria-label="Pay invoice with PayPal"
            createOrder={async () => {
              const response = await fetch(
                `/api/invoices/${invoiceId}/paypal/create-order`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ pay_token: payToken }),
                },
              );

              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.error ?? "Could not create order");
              }
              return data.orderId;
            }}
            onApprove={async (data) => {
              const response = await fetch(
                `/api/invoices/${invoiceId}/paypal/capture`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId: data.orderID,
                    pay_token: payToken,
                  }),
                },
              );

              const result = await response.json();
              if (!response.ok) {
                setError(result.error ?? "Payment failed");
                return;
              }

              setSuccess(true);
              router.refresh();
            }}
            onError={() => {
              setError("PayPal encountered an error. Please try again.");
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
}
