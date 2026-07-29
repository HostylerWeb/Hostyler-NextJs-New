"use client";

import { useActionState, useTransition, useState } from "react";
import {
  cancelInvoiceAction,
  markInvoicePaidAction,
  resendInvoiceAction,
  sendInvoiceAction,
  sendReminderAction,
  type InvoiceActionState,
} from "@/lib/actions/invoices";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type InvoiceAdminActionsProps = {
  invoiceId: string;
  status: string;
};

const initialState: InvoiceActionState = {};

export function InvoiceAdminActions({
  invoiceId,
  status,
}: InvoiceAdminActionsProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<InvoiceActionState>({});
  const [showPaidForm, setShowPaidForm] = useState(false);
  const paidAction = markInvoicePaidAction.bind(null, invoiceId);
  const [paidState, paidFormAction, paidPending] = useActionState(
    paidAction,
    initialState,
  );

  function run(action: () => Promise<InvoiceActionState>) {
    startTransition(async () => {
      const result = await action();
      setMessage(result);
    });
  }

  const canSend = status === "draft";
  const canPayActions = ["sent", "viewed", "overdue", "partially_paid"].includes(
    status,
  );
  const canCancel = status !== "paid" && status !== "cancelled";

  return (
    <div className="space-y-4">
      {message.error ? <Alert variant="error">{message.error}</Alert> : null}
      {message.success ? <Alert variant="success">{message.success}</Alert> : null}
      {paidState.error ? <Alert variant="error">{paidState.error}</Alert> : null}
      {paidState.success ? (
        <Alert variant="success">{paidState.success}</Alert>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {canSend ? (
          <Button
            type="button"
            disabled={pending}
            onClick={() => run(() => sendInvoiceAction(invoiceId))}
          >
            Send invoice
          </Button>
        ) : null}
        {canPayActions ? (
          <>
            <Button
              type="button"
              variant="ghost"
              disabled={pending}
              onClick={() => run(() => resendInvoiceAction(invoiceId))}
            >
              Resend email
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={pending}
              onClick={() => run(() => sendReminderAction(invoiceId))}
            >
              Send reminder
            </Button>
          </>
        ) : null}
        {status !== "paid" && status !== "cancelled" ? (
          <Button
            type="button"
            variant="ghost"
            disabled={pending}
            onClick={() => setShowPaidForm((value) => !value)}
          >
            Mark paid manually
          </Button>
        ) : null}
        {canCancel ? (
          <Button
            type="button"
            variant="ghost"
            disabled={pending}
            onClick={() => {
              if (confirm("Void this invoice?")) {
                run(() => cancelInvoiceAction(invoiceId));
              }
            }}
          >
            Cancel invoice
          </Button>
        ) : null}
      </div>

      {showPaidForm ? (
        <form
          action={paidFormAction}
          className="space-y-3 rounded-[var(--radius-md)] border-2 border-ink bg-paper-2 p-4"
        >
          <Field label="Payment note" htmlFor="note">
            <Textarea id="note" name="note" rows={2} required />
          </Field>
          <Button type="submit" size="sm" disabled={paidPending}>
            Confirm manual payment
          </Button>
        </form>
      ) : null}
    </div>
  );
}
