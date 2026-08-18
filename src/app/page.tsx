import CharacterCard from "@/components/character/CharacterCard";
import Container from "@/components/ui/Container";
import { apiFetch } from "@/lib/api/client";
import { getQueryClient } from "@/lib/ReactQueryProvider/get-query-client";
import type { CharacterResponse } from "@/types/character";

export default async function Home() {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery<CharacterResponse>({
    queryKey: ["characters"],
    queryFn: () => apiFetch<CharacterResponse>("/character"),
  });

  if (data.results.length === 0) {
    return (
      <Container className="py-8 text-text-muted">
        No characters found.
      </Container>
    );
  }

  return (
    <Container className="grid gap-x-2 md:gap-x-4 gap-y-6 py-4 sm:grid-cols-2 md:py-8 lg:grid-cols-4">
      {data.results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Container>
  );
}
