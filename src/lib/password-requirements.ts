export const PASSWORD_MIN_LENGTH = 8;

export type PasswordRequirement = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (password) => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "letter",
    label: "Includes a letter",
    test: (password) => /[A-Za-z]/.test(password),
  },
  {
    id: "number",
    label: "Includes a number",
    test: (password) => /[0-9]/.test(password),
  },
];

export function getPasswordRequirementsMet(password: string) {
  return passwordRequirements.filter((requirement) => requirement.test(password)).length;
}

export function getPasswordStrengthPercent(password: string) {
  if (!password) return 0;
  return Math.round(
    (getPasswordRequirementsMet(password) / passwordRequirements.length) * 100,
  );
}

export function isPasswordValid(password: string) {
  return passwordRequirements.every((requirement) => requirement.test(password));
}

export function getPasswordStrengthLabel(password: string) {
  const met = getPasswordRequirementsMet(password);
  if (!password) return "Enter a password";
  if (met === passwordRequirements.length) return "Strong enough";
  if (met >= 2) return "Almost there";
  return "Too weak";
}

export function getPasswordStrengthTone(password: string): "weak" | "medium" | "strong" {
  const met = getPasswordRequirementsMet(password);
  if (met === passwordRequirements.length) return "strong";
  if (met >= 2) return "medium";
  return "weak";
}
