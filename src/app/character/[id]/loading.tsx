import Container from "@/components/ui/Container";

export default function CharacterLoading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading character"
      className="py-6 sm:py-10"
    >
      <Container>
        <div className="h-5 w-48 animate-pulse rounded-sm bg-text-muted/20" />

        <section className="mt-6 overflow-hidden rounded-sm border border-border bg-surface sm:mt-8">
          <div className="grid animate-pulse md:grid-cols-[minmax(280px,400px)_1fr]">
            <div className="aspect-square bg-surface-2 md:aspect-auto md:min-h-100" />

            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
              <div className="h-3 w-40 rounded-sm bg-text-muted/20" />
              <div className="mt-4 h-12 w-3/4 rounded-sm bg-text-muted/20" />
              <div className="mt-6 h-4 w-16 rounded-sm bg-text-muted/20" />

              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-y border-border py-6 sm:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index}>
                    <div className="h-3 w-16 rounded-sm bg-text-muted/20" />
                    <div className="mt-2 h-4 w-24 rounded-sm bg-text-muted/20" />
                  </div>
                ))}
              </div>

              <div className="mt-7 h-4 w-32 rounded-sm bg-text-muted/20" />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
