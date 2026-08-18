"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { CharacterStatus } from "@/types/character";

type CharacterFiltersProps = {
  name: string;
  status: CharacterStatus | "";
  species: string;
};

const speciesOptions = [
  "Human",
  "Alien",
  "Humanoid",
  "Robot",
  "Animal",
  "Mythological Creature",
  "Cronenberg",
  "Disease",
  "Poopybutthole",
  "unknown",
];

const fieldClass = cn(
  "h-10 w-full rounded-sm border border-border bg-surface-2 px-3 text-sm text-text",
  "transition-colors placeholder:text-text-muted/70",
  "focus:border-portal focus:outline-none focus:ring-1 focus:ring-portal/30",
);

export default function CharacterFilters({
  name,
  status,
  species,
}: CharacterFiltersProps) {
  const router = useRouter();
  const [nameValue, setNameValue] = useState(name);
  const [statusValue, setStatusValue] = useState(status);
  const [speciesValue, setSpeciesValue] = useState(species);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (nameValue.trim()) params.set("name", nameValue.trim());
    if (statusValue) params.set("status", statusValue);
    if (speciesValue) params.set("species", speciesValue);

    const query = params.toString();

    router.push(query ? `/?${query}` : "/");
  }

  function handleClear() {
    setNameValue("");
    setStatusValue("");
    setSpeciesValue("");
    router.push("/");
  }

  return (
    <section aria-labelledby="character-filters-title" className="mt-6 sm:mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="character-filters-title" className="sr-only">
          Filter characters
        </h2>

        <form
          action="/"
          method="get"
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-sm border border-border bg-surface p-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="character-name" className="text-xs text-text-muted">
              Search by name
            </label>
            <input
              id="character-name"
              name="name"
              type="search"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              placeholder="Try Rick Sanchez"
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="character-status"
              className="text-xs text-text-muted"
            >
              Status
            </label>
            <select
              id="character-status"
              name="status"
              value={statusValue}
              onChange={(event) =>
                setStatusValue(event.target.value as CharacterStatus | "")
              }
              className={fieldClass}
            >
              <option value="">All statuses</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="character-species"
              className="text-xs text-text-muted"
            >
              Species
            </label>
            <select
              id="character-species"
              name="species"
              value={speciesValue}
              onChange={(event) => setSpeciesValue(event.target.value)}
              className={fieldClass}
            >
              <option value="">All species</option>
              {speciesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 sm:pb-0">
            <button
              type="submit"
              className="h-10 rounded-sm border border-portal-dim bg-portal/10 px-4 text-xs font-semibold text-portal transition-colors hover:bg-portal/20"
            >
              APPLY
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex h-10 items-center rounded-sm px-2 text-xs text-text-muted transition-colors hover:text-portal"
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
