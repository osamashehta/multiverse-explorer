import Link from "next/link";
import Container from "@/components/ui/Container";

type CharacterEmptyStateProps = {
  hasFilters?: boolean;
};

export default function CharacterEmptyState({
  hasFilters = false,
}: CharacterEmptyStateProps) {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-xl rounded-sm border border-border bg-surface px-6 py-10 text-center sm:px-10">
        <p className="font-mono text-xs tracking-[0.2em] text-portal/70">
          SIGNAL NOT FOUND
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-text">
          No characters found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
          {hasFilters
            ? "We could not find a character matching those filters. Try a different name, status, or species."
            : "We could not find any characters right now. Please try again."}
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-sm border border-portal-dim bg-portal/10 px-4 text-xs font-semibold text-portal transition-colors hover:bg-portal/20"
        >
          CLEAR FILTERS
        </Link>
      </div>
    </Container>
  );
}
