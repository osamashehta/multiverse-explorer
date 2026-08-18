import { cn } from "@/lib/utils/cn";
import type { CharacterStatus } from "@/types/character";

interface StatusBadgeProps {
  status: CharacterStatus;
  showLabel?: boolean;
}

export default function StatusBadge({
  status,
  showLabel = true,
}: StatusBadgeProps) {
  const dotClass = cn("inline-block h-2 w-2 shrink-0 rounded-full", {
    "bg-alive shadow-[0_0_6px_var(--color-alive)]": status === "Alive",
    "bg-dead shadow-[0_0_6px_var(--color-dead)]": status === "Dead",
    "bg-unknown": status === "unknown",
  });

  const labelClass = cn("text-xs font-medium tracking-wide", {
    "text-alive": status === "Alive",
    "text-dead": status === "Dead",
    "text-unknown": status === "unknown",
  });

  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-label={`Status: ${status}`}
    >
      <span className={dotClass} />
      {showLabel && <span className={labelClass}>{status}</span>}
    </span>
  );
}
