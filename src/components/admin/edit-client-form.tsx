"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { users } from "@/generated/prisma/client";
import {
  deleteClientAction,
  updateClientAction,
  type ClientActionState,
} from "@/lib/actions/clients";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

type EditClientFormProps = {
  client: users;
};

const initialState: ClientActionState = {};

const selectClassName = cn(
  "w-full border-2 border-ink/25 bg-white px-5 py-3.5 font-body text-[14.5px] font-semibold text-ink",
  "rounded-[var(--radius-md)] focus:border-ink/60 focus:outline-3 focus:outline-lime focus:outline-offset-1",
);

function FormSection({
  title,
  description,
  children,
  tone = "paper",
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  tone?: "paper" | "lime" | "coral";
}) {
  const toneClasses = {
    paper: "bg-paper-2 border-ink/10",
    lime: "bg-lime-tint/60 border-lime/30",
    coral: "bg-coral-tint/40 border-coral/30",
  };

  return (
    <section
      className={cn(
        "space-y-4 rounded-[var(--radius-md)] border-2 p-5",
        toneClasses[tone],
      )}
    >
      <div>
        <h3 className="font-display text-lg">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function EditClientForm({ client }: EditClientFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    updateClientAction.bind(null, client.id),
    initialState,
  );
  const [deletePending, startDelete] = useTransition();
  const [passwordMode, setPasswordMode] = useState<"unchanged" | "generate" | "custom">(
    "unchanged",
  );

  function handleDelete() {
    if (
      !window.confirm(
        `Delete ${client.name}? This will permanently remove their account, invoices, and support tickets.`,
      )
    ) {
      return;
    }

    startDelete(async () => {
      const result = await deleteClientAction(client.id);
      if (result?.error) {
        window.alert(result.error);
        return;
      }
      router.push("/admin/clients");
      router.refresh();
    });
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {state.success ? (
        <Alert variant="success">
          <p>{state.success}</p>
          {state.generatedPassword ? (
            <p className="mt-2">
              New temporary password:{" "}
              <code className="rounded border border-ink/15 bg-paper px-2 py-0.5 font-mono text-[13px]">
                {state.generatedPassword}
              </code>
            </p>
          ) : null}
        </Alert>
      ) : null}

      <FormSection
        title="Profile"
        description="Basic contact information for this client account."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <Input id="name" name="name" defaultValue={client.name} required />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={client.email}
              required
            />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input id="company" name="company" defaultValue={client.company ?? ""} />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={client.phone ?? ""} />
          </Field>
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper px-4 py-3 text-sm font-semibold">
          <Checkbox name="is_active" defaultChecked={client.is_active} />
          Account is active — client can log in and access the portal
        </label>
      </FormSection>

      <FormSection
        title="Security"
        description="Reset the client's password or email them new login credentials."
        tone="lime"
      >
        <Field label="Password" htmlFor="password_mode">
          <select
            id="password_mode"
            name="password_mode"
            className={selectClassName}
            value={passwordMode}
            onChange={(event) =>
              setPasswordMode(event.target.value as "unchanged" | "generate" | "custom")
            }
          >
            <option value="unchanged">Leave password unchanged</option>
            <option value="generate">Generate a new temporary password</option>
            <option value="custom">Set a new password manually</option>
          </select>
        </Field>

        {passwordMode === "custom" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="New password" htmlFor="password">
              <Input
                id="password"
                name="password"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
            </Field>
            <Field label="Confirm new password" htmlFor="confirm_password">
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
            </Field>
          </div>
        ) : null}

        {passwordMode !== "unchanged" ? (
          <label className="flex cursor-pointer items-start gap-2 rounded-[var(--radius-md)] border-2 border-ink/10 bg-paper px-4 py-3 text-sm font-semibold">
            <Checkbox name="send_credentials_email" className="mt-0.5" />
            <span>
              Email updated login credentials to the client
              <span className="mt-1 block text-xs font-medium text-muted">
                Sends their email and the new password after you save.
              </span>
            </span>
          </label>
        ) : null}
      </FormSection>

      <div className="flex flex-wrap gap-3 border-t-2 border-ink/10 pt-5">
        <Button type="submit" disabled={pending}>
          Save changes
        </Button>
      </div>

      <FormSection
        title="Danger zone"
        description="Permanently delete this client and all related invoices and tickets."
        tone="coral"
      >
        <Button
          type="button"
          variant="ghost"
          disabled={deletePending}
          onClick={handleDelete}
          className="border-coral/30 bg-paper text-coral hover:bg-coral hover:text-paper"
        >
          Delete client account
        </Button>
      </FormSection>
    </form>
  );
}
