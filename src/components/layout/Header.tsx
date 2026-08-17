import Link from "next/link";
import Container from "../ui/Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Multiverse Explorer home"
        >
          <span className="flex size-3 rounded-full bg-portal shadow-[0_0_12px_var(--color-portal)]" />

          <span className="font-display text-xl font-semibold tracking-wide text-text transition-colors group-hover:text-portal">
            Multiverse Explorer
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <Link
            href="/"
            className="font-body text-sm font-medium text-text-dim transition-colors hover:text-portal"
          >
            Character Dashboard
          </Link>
        </nav>
      </Container>
    </header>
  );
}
