import Link from "next/link";
import Container from "../ui/Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label="Multiverse Explorer home"
        >
          <span className="size-2.5 shrink-0 rounded-full bg-portal shadow-[0_0_12px_var(--color-portal)] sm:size-3" />

          <span className="truncate  font-display text-sm font-semibold tracking-wide text-text transition-colors hover:text-portal sm:text-base lg:text-xl">
            Multiverse Explorer
          </span>
        </Link>

        <nav className="shrink-0" aria-label="Main navigation">
          <Link
            href="/"
            className="whitespace-nowrap font-body text-xs font-medium text-text-dim transition-colors hover:text-portal sm:text-sm"
          >
            Character Dashboard
          </Link>
        </nav>
      </Container>
    </header>
  );
}
