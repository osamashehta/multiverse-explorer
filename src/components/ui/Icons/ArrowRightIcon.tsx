import { cn } from "@/lib/utils/cn";

const ArrowRightIcon = ({ rotate = false }) => {
  return (
    <svg
      aria-hidden="true"
      className={cn("size-3 shrink-0", { "rotate-180": rotate })}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8L22 12L18 16" />
      <path d="M2 12H22" />
    </svg>
  );
};

export default ArrowRightIcon;
