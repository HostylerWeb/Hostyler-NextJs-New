export type PayPalClientEnvironment = "sandbox" | "production";

export function getPayPalClientEnvironment(
  mode: string,
): PayPalClientEnvironment {
  return mode === "live" ? "production" : "sandbox";
}
