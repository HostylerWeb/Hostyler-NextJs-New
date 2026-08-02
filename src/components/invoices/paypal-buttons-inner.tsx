"use client";

import {
  INSTANCE_LOADING_STATE,
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  PayPalProvider,
  usePayPal,
} from "@paypal/react-paypal-js/sdk-v6";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { PayPalCheckoutSlot } from "@/components/invoices/paypal-checkout-slot";
import type { PayPalClientEnvironment } from "@/lib/paypal-client";

type InvoicePayPalButtonProps = {
  invoiceId: string;
  payToken?: string;
};

function InvoicePayPalButtons({ invoiceId, payToken }: InvoicePayPalButtonProps) {
  const router = useRouter();
  const { loadingStatus } = usePayPal();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = useCallback(async () => {
    if (isProcessing) {
      const message = "Payment is already being processed.";
      setError(message);
      throw new Error(message);
    }

    setError(null);

    const response = await fetch(
      `/api/invoices/${invoiceId}/paypal/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pay_token: payToken }),
      },
    );

    const data = (await response.json()) as {
      orderId?: string;
      error?: string;
    };

    if (!response.ok || !data.orderId) {
      const message = data.error ?? "Could not start checkout. Please try again.";
      setError(message);
      throw new Error(message);
    }

    return { orderId: data.orderId };
  }, [invoiceId, payToken, isProcessing]);

  const onApprove = useCallback(
    async (data: { orderId: string }) => {
      setIsProcessing(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/invoices/${invoiceId}/paypal/capture`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderId,
              pay_token: payToken,
            }),
          },
        );

        const result = (await response.json()) as { error?: string };
        if (!response.ok) {
          setIsProcessing(false);
          setError(result.error ?? "Payment failed. Please try again.");
          return;
        }

        router.refresh();
      } catch {
        setIsProcessing(false);
        setError("Payment failed. Please try again.");
      }
    },
    [invoiceId, payToken, router],
  );

  if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
    return (
      <p className="text-sm text-muted" role="status">
        Loading payment options…
      </p>
    );
  }

  if (loadingStatus === INSTANCE_LOADING_STATE.REJECTED) {
    return (
      <Alert variant="error">
        PayPal could not be loaded. Please refresh the page or contact support.
      </Alert>
    );
  }

  if (isProcessing) {
    return (
      <Alert variant="success" role="status">
        Processing your payment…
      </Alert>
    );
  }

  return (
    <div className="w-full space-y-5">
      {error ? <Alert variant="error">{error}</Alert> : null}

      <div className="w-full space-y-3">
        <div>
          <p className="text-sm font-bold">Pay with debit or credit card</p>
          <p className="mt-1 text-xs text-muted">
 No PayPal account needed, checkout as a guest.
          </p>
        </div>
        <PayPalCheckoutSlot
          variant="card"
          className="min-h-[48px] rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper p-3"
        >
          <PayPalGuestPaymentButton
            createOrder={createOrder}
            onApprove={onApprove}
            onError={() => {
              setError("Card payment encountered an error. Please try again.");
            }}
            onCancel={() => {
              setError(null);
            }}
          />
        </PayPalCheckoutSlot>
      </div>

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t-2 border-ink/10" />
        </div>
        <p className="relative mx-auto w-fit bg-paper px-3 text-xs font-bold uppercase tracking-wide text-muted">
          or
        </p>
      </div>

      <div className="w-full space-y-3">
        <p className="text-sm font-bold">Pay with PayPal</p>
        <PayPalCheckoutSlot className="min-h-[48px] rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper p-3">
          <PayPalOneTimePaymentButton
            type="pay"
            presentationMode="auto"
            createOrder={createOrder}
            onApprove={onApprove}
            onError={() => {
              setError("PayPal encountered an error. Please try again.");
            }}
            onCancel={() => {
              setError(null);
            }}
          />
        </PayPalCheckoutSlot>
      </div>

      <p className="text-center text-xs text-muted">
        Payments are processed securely by PayPal.
      </p>
    </div>
  );
}

type PayPalButtonsInnerProps = {
  invoiceId: string;
  payToken?: string;
  clientId: string;
  environment: PayPalClientEnvironment;
};

export function PayPalButtonsInner({
  invoiceId,
  payToken,
  clientId,
  environment,
}: PayPalButtonsInnerProps) {
  return (
    <PayPalProvider
      clientId={clientId}
      environment={environment}
      components={["paypal-payments", "paypal-guest-payments"]}
      pageType="checkout"
    >
      <InvoicePayPalButtons invoiceId={invoiceId} payToken={payToken} />
    </PayPalProvider>
  );
}
