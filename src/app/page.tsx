import { Suspense } from "react";
import CharacterCard from "@/components/character/CharacterCard";
import CharacterEmptyState from "@/components/character/CharacterEmptyState";
import CharacterFilters from "@/components/character/CharacterFilters";
import CharacterGridSkeleton from "@/components/character/CharacterGridSkeleton";
import Pagination from "@/components/layout/Pagination";
import Container from "@/components/ui/Container";
import { apiFetch } from "@/lib/api/client";
import { getQueryClient } from "@/lib/ReactQueryProvider/get-query-client";
import type { CharacterResponse, CharacterStatus } from "@/types/character";

type SearchParams = Record<string, string | string[] | undefined>;

type HomeProps = {
  searchParams: Promise<SearchParams>;
};

function getPage(value?: string) {
  const page = Number(value ?? 1);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

function getParam(params: SearchParams, key: string) {
  const value = params[key];

  return (Array.isArray(value) ? value[0] : value) ?? "";
}

function getStatus(value: string): CharacterStatus | "" {
  return value === "Alive" || value === "Dead" || value === "unknown"
    ? value
    : "";
}

async function CharacterList({
  page,
  name,
  status,
  species,
  searchParams,
}: {
  page: number;
  name: string;
  status: CharacterStatus | "";
  species: string;
  searchParams: SearchParams;
}) {
  const queryClient = getQueryClient();
  const apiParams = new URLSearchParams({ page: String(page) });

  if (name) apiParams.set("name", name);
  if (status) apiParams.set("status", status);
  if (species) apiParams.set("species", species);

  let data: CharacterResponse;

  try {
    data = await queryClient.fetchQuery<CharacterResponse>({
      queryKey: ["characters", { page, name, status, species }],
      queryFn: () =>
        apiFetch<CharacterResponse>(`/character?${apiParams.toString()}`),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "There is nothing here") {
      return (
        <CharacterEmptyState hasFilters={Boolean(name || status || species)} />
      );
    }

    throw error;
  }

  if (data.results.length === 0) {
    return (
      <CharacterEmptyState hasFilters={Boolean(name || status || species)} />
    );
  }

  return (
    <>
      <Container className="grid gap-x-2 gap-y-6 py-4 sm:grid-cols-2 md:gap-x-4 md:py-8 lg:grid-cols-4">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Container>
      <Pagination
        info={data.info}
        currentPage={page}
        searchParams={searchParams}
      />
    </>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const page = getPage(pageParam);
  const name = getParam(params, "name");
  const status = getStatus(getParam(params, "status"));
  const species = getParam(params, "species");

  return (
    <>
      <CharacterFilters
        key={`${name}-${status}-${species}`}
        name={name}
        status={status}
        species={species}
      />
      <Suspense fallback={<CharacterGridSkeleton />}>
        <CharacterList
          page={page}
          name={name}
          status={status}
          species={species}
          searchParams={params}
        />
      </Suspense>
    </>
  );
}
