# AGENTS.md

React 19 + Vite 8 SPA for SIMAK (Indonesian hajj/umrah community app). Frontend only — the backend is an external PHP API, not in this repo.

## Commands

- `npm run dev` — dev server on LAN (`vite --host`), uses `.env.development`.
- `npm run dev:prod` — dev server against production env. Use this to reproduce prod-only API issues.
- `npm run build` — production build (`vite build --mode production`) into `dist/`.
- `npm run lint` / `npm run lint:fix` — ESLint only.
- There is no test runner, test script, or CI. Verify changes with `npm run build` plus the relevant manual flow.

Known baseline (don't chase these unless the task is about them):

- `npm run lint` currently exits 1 with 6 `react-hooks/set-state-in-effect` errors: `EditGallerySections.jsx`, `EventMap.jsx`, `OsmAutocomplete.jsx`, `ProfileDetail.jsx`, `useGeoLocation.js`, `DoaPage.jsx`.
- `npm run build` passes but warns that `bedgeVariants` is not exported from `src/utils/helpers/motion.js` (used by `HeroSection.jsx`), and that the main chunk exceeds 500 kB.

## API / environment

- Env files are untracked; use `example.env` as the template. `.env.development` points at `http://localhost/simak_api/api`; `.env.production` at `https://simak-api.my.id/api`.
- All app data calls are `POST` requests to flat PHP endpoints (`login.php`, `register.php`, `user.php`, `admin.php`, `leader.php`) using per-role axios clients in `src/utils/{user,admin,leader}/api.js`. Each client creates its own axios instance from `VITE_API_BASE_URL`; follow that pattern instead of introducing a shared client.
- Backend responses use `status: 'success' | 'failed' | 'error'`. Some helpers return an error object while others throw — preserve the module's existing behavior.
- Uploaded files (event images, materials) are served from `VITE_STORAGE_BASE_URL`, not the API base.
- Quran/prayer requests go directly to `https://equran.id` with absolute URLs. The `/api-equran` dev proxy in `vite.config.js` is currently unused.
- `db.json` is malformed (two top-level JSON objects) and gitignored. `json-server` is installed but has no script; don't use it as a data source.

## Architecture

- Entry flow: `src/main.jsx` → `src/App.jsx` (AuthProvider + BrowserRouter) → `src/routes/AppRoutes.jsx`.
- Import routing APIs from `react-router` (v8), never `react-router-dom`.
- Pages are grouped by role: `src/pages/{global,admin,leader,user}`. Layouts live in `src/layouts`, role UI in `src/components/{role}`, hooks in `src/hooks/{role}`, API clients in `src/utils/{role}/api.js`, zod schemas in `src/utils/schemas`.
- Every role page folder has a hand-maintained `index.js` barrel. Adding a page means: create the file, add it to the barrel, then add the route in `AppRoutes.jsx`. There is no auto-discovery.
- `src/pages/global/index.js` also re-exports `Routes`, `Route`, `Navigate`, and the route guards. `AppRoutes.jsx` imports them from there, not directly from `react-router`.
- Auth: `AuthProvider` persists the session in localStorage under `user_data` and exposes `{ user, login, logout, completeIdentity }` via `useAuth()`. The `user`/`token` keys are legacy and only removed on logout; read `user_data`. Guards normalize roles to lowercase; `IdentityGuard` treats `isCompleted` as either boolean or `0`/`1`.
- User onboarding is split: incomplete users are forced to `/user/form`, complete users are redirected away from it.
- Material access is deliberately strict: `MaterialGuardRoute` + `useMaterialAccess` require the event to be `live` **and** `isAttended` to be true. Attendance itself needs a QR scan plus geolocation. Keep both checks when changing event, material, or attendance code.
- Tailwind is v4 via `@tailwindcss/vite`; theme tokens (`sea-green-*`, `galliano-*`) are defined in `src/index.css`. There is no `tailwind.config.js`.

## Conventions / gotchas

- Prettier: single quotes, semicolons. No format script — run `npx prettier --write <files>`.
- ESLint extends `eslint-config-dicodingacademy`; unused vars are allowed when prefixed `_`; `camelcase` is off because API payloads use snake_case.
- UI copy is Indonesian; keep user-facing strings in Indonesian. Many comments are ALL CAPS — match surrounding style.
- `.gitignore` ignores all `*.md` and the exception is mistyped (`!README,md`), so new Markdown files, including this one, are untracked by default. Don't `git add -f` unless asked.
- `zoba.js` and `prompt/` are gitignored scratch/PRD material. Useful context, but code and config are authoritative.
- Work happens on branch `client`; commits use conventional prefixes (`feat:`, `chore:`, `refactor:`).

## Task Tracking Rule

- Always refer to `docs/task.md` for current feature progress.
- Automatically update checkboxes (`- [ ]` to `- [x]`) in `docs/task.md` whenever a task is completed.

## Project Architecture & Code Organization Rules

- **Pure Logic & Helper Functions (`src/utils/helpers/`)**: Any pure JavaScript functions for data calculation, formatting, status mapping, or validation MUST be placed in dedicated helper files inside `src/utils/helpers/`—never inside React components or pages.
- **UI Helper & State Components**: Small, tightly-coupled UI sub-components (such as loading skeletons, empty states, error states, or internal badges) that only support a specific feature should be consolidated into a single shared helper JSX file within that feature's component folder (e.g., `FeatureState.jsx`) and exported cleanly via an `index.js` barrel file. Avoid creating dozens of tiny single-purpose component files.
- **Global Reusable UI (`src/components/ui/global/`)**: Check `src/components/ui/global/` first before creating new UI primitives. Reuse existing global helpers, status components, and skeletons whenever possible.
- **API & Data Contract Alignment**: When building or integrating backend endpoints, match the response structure to the existing frontend data hooks/services so UI components remain decoupled from data-fetching changes.
- **Task Tracking**: Always refer to `docs/task.md` for feature progress and check off (`- [x]`) completed tasks automatically.
