import Link from "next/link";
import type { CharacterPageInfo } from "@/types/character";
import ArrowRightIcon from "../ui/Icons/ArrowRightIcon";

export type SearchParams = Record<string, string | string[] | undefined>;

export function handlePagination(searchParams: SearchParams, page: number) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value) {
      params.set(key, value);
    }
  });

  if (page === 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const query = params.toString();

  return query ? `/?${query}` : "/";
}

interface PaginationProps {
  info: CharacterPageInfo;
  currentPage: number;
  searchParams: SearchParams;
}

const controlClass =
  "flex h-8 items-center justify-center gap-1.5 rounded-sm border px-2 text-xs text-text-muted transition-colors hover:border-portal-dim hover:text-portal";
const disabledClass =
  "cursor-not-allowed border-border opacity-40 hover:border-border hover:text-text-muted";

export default function Pagination({
  info,
  currentPage,
  searchParams,
}: PaginationProps) {
  const previousPage = info.prev ? currentPage - 1 : null;
  const nextPage = info.next ? currentPage + 1 : null;

  return (
    <nav
      aria-label="Character pagination"
      className="mt-8 flex w-full items-center justify-center gap-2 pb-12 lg:mt-12 lg:pb-16"
    >
      {previousPage ? (
        <Link
          href={handlePagination(searchParams, previousPage)}
          className={`${controlClass} border-border`}
        >
          <ArrowRightIcon rotate />
          PREV
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${controlClass} ${disabledClass}`}
        >
          <ArrowRightIcon rotate />
          PREV
        </span>
      )}

      <span
        aria-current="page"
        className="flex h-8 min-w-20 items-center justify-center rounded-sm border border-portal-dim px-2 text-xs text-portal"
      >
        Page {currentPage} of {info.pages}
      </span>

      {nextPage ? (
        <Link
          href={handlePagination(searchParams, nextPage)}
          className={`${controlClass} border-border`}
        >
          NEXT
          <ArrowRightIcon />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={`${controlClass} ${disabledClass}`}
        >
          NEXT
          <ArrowRightIcon />
        </span>
      )}
    </nav>
  );
}
