import { cn } from "@/lib/cn";

const invoiceStatusStyles: Record<string, string> = {
  draft: "bg-paper-2 text-muted",
  sent: "bg-violet-tint text-ink",
  viewed: "bg-coral-tint text-ink",
  partially_paid: "bg-lime-tint text-ink",
  paid: "bg-lime text-ink",
  overdue: "bg-coral text-white",
  cancelled: "bg-ink/10 text-muted line-through",
};

const ticketStatusStyles: Record<string, string> = {
  open: "bg-violet-tint text-ink",
  waiting_on_client: "bg-coral-tint text-ink",
  waiting_on_staff: "bg-lime-tint text-ink",
  resolved: "bg-lime text-ink",
  closed: "bg-paper-2 text-muted",
};

const paymentStatusStyles: Record<string, string> = {
  pending: "bg-coral-tint text-ink",
  completed: "bg-lime text-ink",
  failed: "bg-coral text-white",
  refunded: "bg-paper-2 text-muted",
};

type StatusKind = "invoice" | "ticket" | "payment";

const styleMaps: Record<StatusKind, Record<string, string>> = {
  invoice: invoiceStatusStyles,
  ticket: ticketStatusStyles,
  payment: paymentStatusStyles,
};

function formatStatusLabel(status: string) {
  return status.replaceAll("_", " ");
}

type StatusBadgeProps = {
  status: string;
  kind?: StatusKind;
  className?: string;
};

export function StatusBadge({
  status,
  kind = "invoice",
  className,
}: StatusBadgeProps) {
  const styles = styleMaps[kind][status] ?? "bg-paper-2 text-ink";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase",
        styles,
        className,
      )}
    >
      {formatStatusLabel(status)}
    </span>
  );
}
