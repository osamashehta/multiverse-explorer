import type { Episode } from "@/types/episode";

type EpisodeListProps = {
  episodes: Episode[];
};

export default function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <section
      aria-labelledby="episodes-title"
      className="mt-6 overflow-hidden rounded-sm border border-border  sm:mt-8"
    >
      <div className="flex items-end justify-between gap-4 border-b border-border px-5 py-4 sm:px-8">
        <h2
          id="episodes-title"
          className="mt-1 font-display text-2xl font-semibold text-text"
        >
          Episodes
        </h2>
        <span className="font-mono text-xs text-text-muted">
          {episodes.length} total
        </span>
      </div>

      {episodes.length > 0 ? (
        <ol className="grid gap-px  sm:grid-cols-2">
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className="bg-surface p-4 transition-colors hover:bg-surface-2 sm:p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs text-portal">
                  {episode.episode}
                </p>
                <p className="shrink-0 text-[10px] text-text-muted">
                  {episode.air_date}
                </p>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-text">
                {episode.name}
              </h3>
            </li>
          ))}
        </ol>
      ) : (
        <p className="px-5 py-8 text-sm text-text-muted sm:px-8">
          No episode records are available for this character.
        </p>
      )}
    </section>
  );
}
