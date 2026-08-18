import Container from "@/components/ui/Container";

function CharacterCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="relative flex w-full animate-pulse flex-col overflow-hidden rounded-sm border border-border bg-surface"
    >
      <span className="absolute left-0 top-0 z-10 h-3 w-3 border-l border-t border-portal/20" />
      <span className="absolute right-0 top-0 z-10 h-3 w-3 border-r border-t border-portal/20" />
      <span className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l border-portal/20" />
      <span className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r border-portal/20" />

      <div className="aspect-square bg-surface-2" />

      <div className="flex flex-col gap-2 p-3">
        <div className="h-5 w-3/4 rounded-sm bg-text-muted/20" />

        <div className="flex items-center justify-between">
          <div className="h-4 w-16 rounded-sm bg-text-muted/20" />
          <div className="h-3 w-14 rounded-sm bg-text-muted/20" />
        </div>

        <div className="flex items-center gap-1">
          <div className="size-3 rounded-full bg-text-muted/20" />
          <div className="h-3 w-2/3 rounded-sm bg-text-muted/20" />
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-border pt-1.5">
          <div className="h-3 w-20 rounded-sm bg-text-muted/20" />
          <div className="h-3 w-12 rounded-sm bg-text-muted/20" />
        </div>
      </div>
    </article>
  );
}

export default function CharacterGridSkeleton() {
  return (
    <Container
      aria-busy="true"
      aria-label="Loading characters"
      className="grid gap-x-2 gap-y-6 py-4 sm:grid-cols-2 md:gap-x-4 md:py-8 lg:grid-cols-4"
    >
      {Array.from({ length: 20 }, (_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </Container>
  );
}
