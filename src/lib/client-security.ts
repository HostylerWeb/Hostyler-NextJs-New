export type ClientSecurityContext = {
  device_fingerprint: string;
  browser_details: string;
};

export function collectClientSecurityContext(): ClientSecurityContext {
  if (typeof window === "undefined") {
    return { device_fingerprint: "", browser_details: "" };
  }

  const ua = navigator.userAgent;
  const parts = [
    ua,
    navigator.language,
    String(screen.width),
    String(screen.height),
    String(screen.colorDepth),
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    navigator.platform ?? "",
    String(navigator.hardwareConcurrency ?? ""),
  ];
  const raw = parts.join("|");

  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }

  return {
    device_fingerprint: `fp_${Math.abs(hash).toString(16)}`,
    browser_details: `${ua} · ${navigator.platform ?? "unknown"} · ${navigator.language}`,
  };
}

export function appendSecurityFields(formData: FormData, context: ClientSecurityContext) {
  formData.set("device_fingerprint", context.device_fingerprint);
  formData.set("browser_details", context.browser_details);
}
