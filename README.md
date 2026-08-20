# Multiverse Explorer

A responsive Rick and Morty character explorer built for the Front-End Engineer take-home assignment.

Explore characters, filter the dashboard, navigate through API pages, and open a character profile with its episode appearances.

## Live Project

- GitHub: https://github.com/osamashehta/multiverse-explorer
- Live application: https://multiverse-explorer-drab.vercel.app/

## Features

- Responsive character dashboard
- Character cards with image, status, species, location, and episode count
- Server-side pagination
- Server-side filtering by name, status, and species
- URL-synchronized filters and pagination
- Character detail pages at `/character/[id]`
- Character profile information including origin and current location
- Batched episode fetching and episode list display
- Status-aware styling for Alive, Dead, and Unknown characters
- Loading skeletons
- Empty, API error, invalid character, and global 404 states
- Responsive dark sci-fi visual system
- Dynamic SEO metadata for the homepage and character pages
- Focused unit tests for filter and pagination URL behavior

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript with strict mode
- TanStack Query v5
- Tailwind CSS v4
- `classnames`
- Vitest
- React Testing Library dependencies for future component tests
- Rick and Morty REST API

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/osamashehta/multiverse-explorer.git
cd multiverse-explorer
npm install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Commands

```bash
npm run dev         # Start the development server
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript without emitting files
npm run test        # Run the test suite once
npm run test:watch  # Run Vitest in watch mode
npm run build       # Create a production build
npm run start       # Start the production server
```

## Environment Variables

| Variable | Description | Local value |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Rick and Morty API base URL | `https://rickandmortyapi.com/api` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site and metadata base URL | `http://localhost:3000` |

For Vercel, configure the production values in Project Settings:

```env
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api
NEXT_PUBLIC_SITE_URL=https://multiverse-explorer-drab.vercel.app
```

`.env.local` is ignored by Git. `.env.example` documents the required variables.

## Architecture

### Why the App Router

The App Router provides route-level loading UI, server components, dynamic route segments, and built-in metadata handling. It also keeps the initial character and detail requests on the server while allowing small interactive client components where needed.

### Server and Client Boundaries

- `src/app/page.tsx` is a server component that reads URL parameters and fetches dashboard data.
- `src/app/character/[id]/page.tsx` is a server component that fetches character and episode data.
- `CharacterFilters` is a client component because it manages form state and updates the URL with `useRouter`.
- The React Query provider is mounted in the root layout.
- Loading UI is handled with App Router `loading.tsx` files and Suspense boundaries.

### Filtering and Pagination

The URL is the source of truth:

```text
/?name=Rick&status=Alive&species=Human&page=2
```

When filters are submitted, the page resets to the first page. Pagination preserves the active filters and updates only the `page` parameter.

The API receives the values directly:

```text
/character?page=2&name=Rick&status=Alive&species=Human
```

Server-side filtering was chosen because it searches the complete API dataset instead of filtering only the currently loaded page. It also keeps URLs shareable and avoids downloading every character to the browser.

### Episode Data

The character API returns episode URLs rather than complete episode objects. The application extracts the episode IDs and requests them in a single batch:

```text
/episode/1,2,3
```

The response is normalized so both the single-episode object response and multi-episode array response can be rendered by the same `EpisodeList` component.

## Folder Structure

```text
src/
  app/
    character/[id]/
      loading.tsx
      page.tsx
    globals.css
    layout.tsx
    not-found.tsx
    page.tsx
  components/
    character/
      CharacterCard.tsx
      CharacterFilters.test.tsx
      CharacterEmptyState.tsx
      CharacterErrorState.tsx
      CharacterFilters.tsx
      CharacterGridSkeleton.tsx
      CharacterProfileCard.tsx
    episode/
      EpisodeList.tsx
    layout/
      Header.tsx
      Pagination.test.tsx
      Pagination.tsx
    ui/
      Breadcrumb.tsx
      Container.tsx
      StatusBadge.tsx
  lib/
    api/
      client.ts
      episodes.ts
    ReactQueryProvider/
      get-query-client.ts
      index.tsx
    utils/
      cn.ts
  types/
    character.ts
    episode.ts
```

## Testing

Vitest covers the highest-value URL behavior:

- `CharacterFilters.test.tsx` verifies empty filters are excluded and names are trimmed and encoded.
- `Pagination.test.tsx` verifies active filters are preserved and page one removes the page parameter.

Run the tests with:

```bash
npm run test
```

The tests are colocated with the components they cover and focus on pure URL navigation behavior.

## Technical Decisions


- Pagination uses server navigation rather than client-side infinite scrolling because the API already exposes page metadata and the URL state is shareable.
- The species dropdown contains a curated set of common API values instead of dynamically loading every possible species.
- Episode data is fetched in a batch request to avoid one uncontrolled request per episode.
- Tests focus on URL synchronization rather than broad component coverage because it demonstrates the most important application logic.
- The project uses a single dark visual direction rather than implementing theme switching.

## Deployment

The application is deployed on Vercel.

For a new deployment:

1. Import the GitHub repository into Vercel.
2. Use the default Next.js build settings.
3. Add `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` as environment variables.
4. Deploy the project.
5. Verify the dashboard, filters, pagination, character details, and invalid routes in production.
