import Script from "next/script";

type TawkChatProps = {
  propertyId: string;
  widgetId: string;
};

export function TawkChat({ propertyId, widgetId }: TawkChatProps) {
  return (
    <Script
      id="tawk-chat"
      strategy="afterInteractive"
      src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
      crossOrigin="anonymous"
      charSet="UTF-8"
    />
  );
}
