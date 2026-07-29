"use client";

import { useActionState } from "react";
import {
  changePasswordAction,
  updateProfileAction,
  type SettingsActionState,
} from "@/lib/actions/portal-settings";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type SettingsFormProps = {
  profile: {
    name: string;
    email: string;
    company?: string | null;
    phone?: string | null;
  };
};

const initialState: SettingsActionState = {};

export function SettingsForm({ profile }: SettingsFormProps) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateProfileAction,
    initialState,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePasswordAction,
    initialState,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="space-y-4 p-6">
        <h2 className="font-display text-xl">Profile</h2>
        {profileState.error ? (
          <Alert variant="error">{profileState.error}</Alert>
        ) : null}
        {profileState.success ? (
          <Alert variant="success">{profileState.success}</Alert>
        ) : null}
        <form action={profileAction} className="space-y-4">
          <Field label="Name" htmlFor="name">
            <Input id="name" name="name" defaultValue={profile.name} required />
          </Field>
          <Field label="Email">
            <Input value={profile.email} disabled />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input
              id="company"
              name="company"
              defaultValue={profile.company ?? ""}
            />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" name="phone" defaultValue={profile.phone ?? ""} />
          </Field>
          <Button type="submit" disabled={profilePending}>
            Save profile
          </Button>
        </form>
      </Card>

      <Card className="space-y-4 p-6">
        <h2 className="font-display text-xl">Change password</h2>
        {passwordState.error ? (
          <Alert variant="error">{passwordState.error}</Alert>
        ) : null}
        {passwordState.success ? (
          <Alert variant="success">{passwordState.success}</Alert>
        ) : null}
        <form action={passwordAction} className="space-y-4">
          <Field label="Current password" htmlFor="current_password">
            <Input
              id="current_password"
              name="current_password"
              type="password"
              autoComplete="current-password"
              required
            />
          </Field>
          <Field label="New password" htmlFor="new_password">
            <Input
              id="new_password"
              name="new_password"
              type="password"
              autoComplete="new-password"
              required
            />
          </Field>
          <Field label="Confirm password" htmlFor="confirm_password">
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
            />
          </Field>
          <Button type="submit" disabled={passwordPending}>
            Update password
          </Button>
        </form>
      </Card>
    </div>
  );
}
