import Link from "next/link";
import ArrowRightIcon from "@/components/ui/Icons/ArrowRightIcon";
import Container from "@/components/ui/Container";

type CharacterErrorStateProps = {
  message: string;
};

export default function CharacterErrorState({
  message,
}: CharacterErrorStateProps) {
  return (
    <main className="py-6 sm:py-10">
      <Container>
        <div className="mx-auto max-w-xl rounded-sm border border-border bg-surface px-6 py-12 text-center sm:px-10">
          <p className="font-mono text-xs tracking-[0.2em] text-dead/80">
            CHARACTER LOAD ERROR
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-text">
            Unable to load character
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
            {message}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-1.5 border-b border-portal/50 pb-1 text-xs font-semibold tracking-wide text-portal transition-colors hover:border-portal"
          >
            <ArrowRightIcon rotate />
            ALL CHARACTERS
          </Link>
        </div>
      </Container>
    </main>
  );
}
