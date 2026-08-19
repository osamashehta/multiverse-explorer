import { apiFetch } from "./client";
import type { Episode } from "@/types/episode";

export async function getEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) {
    return [];
  }
  const response = await apiFetch<Episode | Episode[]>(
    `/episode/${ids.join(",")}`,
  );

  return Array.isArray(response) ? response : [response];
}
