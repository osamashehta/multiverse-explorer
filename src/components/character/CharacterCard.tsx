import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/character";
import { cn } from "@/lib/utils/cn";
import StatusBadge from "../ui/StatusBadge";
import ArrowRightIcon from "../ui/Icons/ArrowRightIcon";

type CharacterCardProps = {
  character: Character;
};

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Link
      href={`/character/${character.id}`}
      className="block rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-portal/50"
    >
      <article
        className={cn(
          "group relative flex w-full flex-col overflow-hidden rounded-sm text-left",
          "border border-border bg-surface transition-all duration-200",
          "hover:border-portal/40 hover:bg-surface-2",
        )}
      >
        <span className="absolute left-0 top-0 z-10 h-3 w-3 border-l border-t border-portal/0 transition-colors duration-200 group-hover:border-portal/60" />
        <span className="absolute right-0 top-0 z-10 h-3 w-3 border-r border-t border-portal/0 transition-colors duration-200 group-hover:border-portal/60" />
        <span className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l border-portal/0 transition-colors duration-200 group-hover:border-portal/60" />
        <span className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r border-portal/0 transition-colors duration-200 group-hover:border-portal/60" />

        <div className="relative aspect-square overflow-hidden bg-bg">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute bottom-2 left-2">
            <span className="rounded-sm bg-bg/80 px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
              #{String(character.id).padStart(3, "0")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 p-3">
          <h3 className="truncate font-display text-base font-semibold leading-tight tracking-[0.01em] text-text transition-colors duration-150 group-hover:text-portal">
            {character.name}
          </h3>

          <div className="flex items-center justify-between">
            <StatusBadge status={character.status} />
            <span className="text-[11px] text-text-muted">
              {character.species}
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-1">
            <svg
              className="size-3 shrink-0 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate text-[11px] text-text-muted">
              {character.location.name}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between border-t border-border pt-1.5">
            <span className="text-[10px] text-text-muted">
              {character.episode.length} episode
              {character.episode.length !== 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-portal/60 transition-colors group-hover:text-portal">
              VIEW
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CharacterCard;
