import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CharacterErrorState from "@/components/character/CharacterErrorState";
import Container from "@/components/ui/Container";
import StatusBadge from "@/components/ui/StatusBadge";
import { apiFetch } from "@/lib/api/client";
import { getQueryClient } from "@/lib/ReactQueryProvider/get-query-client";
import type { Character } from "@/types/character";

type CharacterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const characterId = Number(id);

  if (!Number.isInteger(characterId) || characterId < 1) {
    return <CharacterErrorState message="Hey! you must provide an id" />;
  }

  let character: Character;
  try {
    character = await getQueryClient().fetchQuery<Character>({
      queryKey: ["character", characterId],
      queryFn: () => apiFetch<Character>(`/character/${characterId}`),
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Character not found"
        ? error.message
        : "Unable to load this character. Please try again.";

    return <CharacterErrorState message={message} />;
  }

  return (
    <main className="py-6 sm:py-10">
      <Container>
        <Breadcrumb
          items={[
            { label: "Character Dashboard", href: "/" },
            { label: character.name },
          ]}
        />

        <section className="mt-6 overflow-hidden rounded-sm border border-border bg-surface sm:mt-8">
          <div className="grid md:grid-cols-[minmax(280px,400px)_1fr]">
            <div className="relative aspect-square bg-bg md:aspect-auto md:min-h-100">
              <Image
                src={character.image}
                alt={character.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
              <p className="font-mono text-xs tracking-[0.2em] text-portal/70">
                CHARACTER #{String(character.id).padStart(3, "0")}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-wide text-text sm:text-5xl">
                {character.name}
              </h1>
              <div className="mt-5">
                <StatusBadge status={character.status} />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6  sm:grid-cols-3">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted">
                    Species
                  </dt>
                  <dd className="mt-1 text-sm text-text">
                    {character.species}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted">
                    Gender
                  </dt>
                  <dd className="mt-1 text-sm text-text">{character.gender}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted">
                    Type
                  </dt>
                  <dd className="mt-1 text-sm text-text">
                    {character.type || "None"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted">
                    Origin
                  </dt>
                  <dd className="mt-1  text-sm text-text">
                    {character.origin.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted">
                    Last Location
                  </dt>
                  <dd className="mt-1  text-sm text-text">
                    {character.location.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-text-muted">
                    Episodes
                  </dt>
                  <dd className="mt-1 text-sm text-text">
                    {character.episode.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
