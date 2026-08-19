import Breadcrumb from "@/components/ui/Breadcrumb";
import CharacterErrorState from "@/components/character/CharacterErrorState";
import CharacterProfileCard from "@/components/character/CharacterProfileCard";
import EpisodeList from "@/components/episode/EpisodeList";
import Container from "@/components/ui/Container";
import { apiFetch } from "@/lib/api/client";
import { getEpisodes } from "@/lib/api/episodes";
import { getQueryClient } from "@/lib/ReactQueryProvider/get-query-client";
import type { Character } from "@/types/character";
import type { Episode } from "@/types/episode";

type CharacterPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const characterId = Number(id);

  if (!Number.isInteger(characterId) || characterId < 1) {
    return <CharacterErrorState message="Hey! you must provide an id" />;
  }

  const queryClient = getQueryClient();
  let character: Character;
  try {
    character = await queryClient.fetchQuery<Character>({
      queryKey: ["character", characterId],
      queryFn: () => apiFetch<Character>(`/character/${characterId}`),
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "There is nothing here"
        ? "We could not find a character with that ID."
        : "Unable to load this character. Please try again.";

    return <CharacterErrorState message={message} />;
  }

  const episodeIds = character.episode
    .map((url) => Number(url.split("/").pop()))
    .filter((id): id is number => Number.isInteger(id) && id > 0);

  let episodes: Episode[] = [];

  if (episodeIds.length > 0) {
    episodes = await queryClient.fetchQuery<Episode[]>({
      queryKey: ["episodes", episodeIds],
      queryFn: () => getEpisodes(episodeIds),
    });
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

        <CharacterProfileCard character={character} />

        <EpisodeList episodes={episodes} />
      </Container>
    </main>
  );
}
