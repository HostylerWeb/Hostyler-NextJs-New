import { TawkChat } from "@/components/chat/tawk-chat";
import { clientEnv } from "@/lib/env";

export function TawkChatLoader() {
  const { NEXT_PUBLIC_TAWK_PROPERTY_ID, NEXT_PUBLIC_TAWK_WIDGET_ID } = clientEnv;

  if (!NEXT_PUBLIC_TAWK_PROPERTY_ID || !NEXT_PUBLIC_TAWK_WIDGET_ID) {
    return null;
  }

  return (
    <TawkChat
      propertyId={NEXT_PUBLIC_TAWK_PROPERTY_ID}
      widgetId={NEXT_PUBLIC_TAWK_WIDGET_ID}
    />
  );
}
