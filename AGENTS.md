# AGENTS.md

## Commands
- **Dev**: `npm run dev` - Start Next.js development server with Turbopack
- **Build**: `npm run build` - Build production bundle with Turbopack (use for type checking)
- **Lint**: `npm run lint` - Run ESLint
- **No test framework** - No test commands configured

## Architecture
- **Framework**: Next.js 16 App Router with React 19
- **Structure**: Route groups for public (`(public)/`) and authenticated pages, parallel routes (`@modal/`), intercepting routes (`(.)notes/[id]`)
- **State**: TanStack Query for server state, Zustand for client state
- **API**: Axios-based service (`lib/api.ts`) with Bearer token auth, API route at `app/api/`
- **Backend**: Local API at `http://localhost:3000/api` (set in `lib/api.ts`)

## Code Style
- **Imports**: Use `@/` alias for root imports (e.g., `@/components/`, `@/lib/`, `@/types/`)
- **Formatting**: Prettier with single quotes, 2 spaces, 80 char width, trailing commas
- **Conventions**: CSS Modules (`.module.css`), `.client.tsx` suffix for client components
- **Types**: Strict TypeScript enabled, types in `types/` directory
- **Forms**: Formik + Yup for validation
- **Naming**: PascalCase for components, camelCase for functions/variables
