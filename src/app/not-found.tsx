import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-xl rounded-sm border border-border bg-surface px-6 py-12 text-center sm:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-portal/70">
            DIMENSION NOT FOUND
          </p>
          <p className="mt-4 font-display text-7xl font-semibold leading-none text-portal">
            404
          </p>
          <h1 className="mt-5 font-display text-2xl font-semibold text-text">
            This universe does not exist
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
            The route you entered is not part of this dimension. Return to the
            character dashboard and continue exploring.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-10 items-center rounded-sm border border-portal-dim bg-portal/10 px-4 text-xs font-semibold text-portal transition-colors hover:bg-portal/20"
          >
            RETURN HOME
          </Link>
        </div>
      </Container>
    </main>
  );
}
