export function getAmountDue(total: number, amountPaid: number): number {
  return Math.round((total - amountPaid) * 100) / 100;
}

export function amountsMatch(
  expected: number,
  actual: number,
  tolerance = 0.01,
): boolean {
  const expectedCents = Math.round(expected * 100);
  const actualCents = Math.round(actual * 100);
  const toleranceCents = Math.round(tolerance * 100);
  return Math.abs(expectedCents - actualCents) <= toleranceCents;
}

export function currenciesMatch(expected: string, actual: string): boolean {
  return expected.toUpperCase() === actual.toUpperCase();
}

export type PayPalCaptureAmount = {
  value: string;
  currency_code: string;
};

export function validateCaptureAmount(
  capture: PayPalCaptureAmount,
  expectedAmount: number,
  expectedCurrency: string,
): { ok: true } | { ok: false; reason: string } {
  const capturedAmount = Number(capture.value);
  if (!Number.isFinite(capturedAmount)) {
    return { ok: false, reason: "Invalid capture amount" };
  }

  if (!currenciesMatch(expectedCurrency, capture.currency_code)) {
    return { ok: false, reason: "Capture currency mismatch" };
  }

  if (!amountsMatch(expectedAmount, capturedAmount)) {
    return { ok: false, reason: "Capture amount mismatch" };
  }

  return { ok: true };
}
