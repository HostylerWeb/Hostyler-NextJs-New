"use client";

import { useActionState, useState } from "react";
import type { users } from "@/generated/prisma/client";
import {
  createInvoiceAction,
  updateInvoiceAction,
  type InvoiceActionState,
} from "@/lib/actions/invoices";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/format";
import {
  type InvoiceCurrency,
} from "@/lib/validators/invoice";

type LineItem = {
  description: string;
  quantity: number;
  unit_price: number;
};

type InvoiceFormProps = {
  clients: users[];
  mode: "create" | "edit";
  invoiceId?: string;
  defaultValues?: {
    user_id: string;
    currency?: InvoiceCurrency;
    tax_rate: number;
    issue_date: string;
    due_date: string;
    client_notes?: string | null;
    notes?: string | null;
    line_items: LineItem[];
  };
};

const initialState: InvoiceActionState = {};

function defaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date.toISOString().slice(0, 10);
}

export function InvoiceForm({
  clients,
  mode,
  invoiceId,
  defaultValues,
}: InvoiceFormProps) {
  const action =
    mode === "create"
      ? createInvoiceAction
      : updateInvoiceAction.bind(null, invoiceId!);

  const [state, formAction, pending] = useActionState(action, initialState);
  const [currency, setCurrency] = useState<InvoiceCurrency>(
    defaultValues?.currency ?? "USD",
  );
  const [lineItems, setLineItems] = useState<LineItem[]>(
    defaultValues?.line_items ?? [
      { description: "", quantity: 1, unit_price: 0 },
    ],
  );

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0,
  );

  function updateLine(index: number, field: keyof LineItem, value: string) {
    setLineItems((items) =>
      items.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "description" ? value : Number(value) || 0,
            }
          : item,
      ),
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? <Alert variant="success">{state.success}</Alert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Client" htmlFor="user_id">
          <Select
            id="user_id"
            name="user_id"
            defaultValue={defaultValues?.user_id}
            required
            disabled={mode === "edit"}
          >
            <option value="">Select client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} ({client.email})
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Currency" htmlFor="currency">
          <Select
            id="currency"
            name="currency"
            defaultValue={defaultValues?.currency ?? "USD"}
            onChange={(event) =>
              setCurrency(event.target.value as InvoiceCurrency)
            }
            required
          >
 <option value="USD">USD: US Dollar</option>
 <option value="EUR">EUR: Euro</option>
 <option value="GBP">GBP: British Pound</option>
          </Select>
        </Field>
        <Field label="Tax rate (%)" htmlFor="tax_rate">
          <Input
            id="tax_rate"
            name="tax_rate"
            type="number"
            min={0}
            max={100}
            step="0.01"
            defaultValue={defaultValues?.tax_rate ?? 0}
          />
        </Field>
        <Field label="Issue date" htmlFor="issue_date">
          <Input
            id="issue_date"
            name="issue_date"
            type="date"
            required
            defaultValue={
              defaultValues?.issue_date ?? new Date().toISOString().slice(0, 10)
            }
          />
        </Field>
        <Field label="Due date" htmlFor="due_date">
          <Input
            id="due_date"
            name="due_date"
            type="date"
            required
            defaultValue={defaultValues?.due_date ?? defaultDueDate()}
          />
        </Field>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg">Line items</h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setLineItems((items) => [
                ...items,
                { description: "", quantity: 1, unit_price: 0 },
              ])
            }
          >
            Add row
          </Button>
        </div>
        {lineItems.map((item, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-[var(--radius-md)] border-2 border-ink bg-paper-2 p-4 md:grid-cols-[2fr_1fr_1fr_auto]"
          >
            <Field label="Description" htmlFor={`line_desc_${index}`}>
              <Input
                id={`line_desc_${index}`}
                name="line_description"
                value={item.description}
                onChange={(e) =>
                  updateLine(index, "description", e.target.value)
                }
                required
              />
            </Field>
            <Field label="Qty" htmlFor={`line_qty_${index}`}>
              <Input
                id={`line_qty_${index}`}
                name="line_quantity"
                type="number"
                min={0.01}
                step="0.01"
                value={item.quantity}
                onChange={(e) => updateLine(index, "quantity", e.target.value)}
                required
              />
            </Field>
            <Field label="Unit price" htmlFor={`line_price_${index}`}>
              <Input
                id={`line_price_${index}`}
                name="line_unit_price"
                type="number"
                min={0}
                step="0.01"
                value={item.unit_price}
                onChange={(e) =>
                  updateLine(index, "unit_price", e.target.value)
                }
                required
              />
            </Field>
            {lineItems.length > 1 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-end"
                onClick={() =>
                  setLineItems((items) => items.filter((_, i) => i !== index))
                }
              >
                Remove
              </Button>
            ) : null}
          </div>
        ))}
        <p className="text-right text-sm font-semibold">
          Subtotal preview: {formatCurrency(subtotal, currency)}
        </p>
      </div>

      <Field label="Client notes (visible on invoice)" htmlFor="client_notes">
        <Textarea
          id="client_notes"
          name="client_notes"
          rows={3}
          defaultValue={defaultValues?.client_notes ?? ""}
        />
      </Field>
      <Field label="Internal notes (admin only)" htmlFor="notes">
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
        />
      </Field>

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving…"
          : mode === "create"
            ? "Create draft invoice"
            : "Save changes"}
      </Button>
    </form>
  );
}
