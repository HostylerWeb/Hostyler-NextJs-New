"use client";

import { useRouter } from "next/navigation";
import { useActionState, useTransition, useState } from "react";
import {
  cancelInvoiceAction,
  deleteInvoiceAction,
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
  invoiceNumber: string;
  status: string;
};

const initialState: InvoiceActionState = {};

export function InvoiceAdminActions({
  invoiceId,
  invoiceNumber,
  status,
}: InvoiceAdminActionsProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [deletePending, startDelete] = useTransition();
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

  function handleDelete() {
    const paymentWarning =
      status === "paid" || status === "partially_paid"
        ? " Payment records for this invoice will also be removed."
        : "";

    if (
      !window.confirm(
        `Permanently delete ${invoiceNumber}? This cannot be undone.${paymentWarning}`,
      )
    ) {
      return;
    }

    startDelete(async () => {
      const result = await deleteInvoiceAction(invoiceId);
      if (result.error) {
        window.alert(result.error);
        return;
      }
      router.push("/admin/invoices");
      router.refresh();
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

      <div className="rounded-[var(--radius-md)] border-2 border-coral/30 bg-coral-tint/20 p-4">
        <p className="font-mono text-[10px] font-bold tracking-wide text-coral uppercase">
          Danger zone
        </p>
        <p className="mt-1 text-sm text-muted">
          Permanently remove this invoice and all related line items, status history,
          and payment records.
        </p>
        <Button
          type="button"
          variant="coral"
          size="sm"
          className="mt-3"
          disabled={deletePending || pending}
          onClick={handleDelete}
        >
          {deletePending ? "Deleting…" : "Delete invoice"}
        </Button>
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
