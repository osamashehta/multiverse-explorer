import CharacterCard from "@/components/character/CharacterCard";
import { apiFetch } from "@/lib/api/client";
import { getQueryClient } from "@/lib/ReactQueryProvider/get-query-client";
import { CharacterResponse } from "@/types/character";

export default async function Home() {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery<CharacterResponse>({
    queryKey: ["characters"],
    queryFn: () => apiFetch("/character"),
  });
  
  return (
    <div>
      <CharacterCard character={data?.results[0]}/>
    </div>
  );
}
