# Task Tracking — Absensi (Attendance Recap)

Refs: `docs/prd-attendance-recap-en.md`, `docs/api-contract-attendance.md`,
`docs/api-contract-admin-leader-attendance.md` (created in Phase 2, Step 1),
`docs/admin-leader-attendance/*.html` (visual/structural reference only), `docs/stich-jamaah-mockup.html`
Branch: `client`

Rules: tick a box only after `npm run build` + the manual flow pass. Keep all mock data
in `src/data/mock/` so Phase 3 can delete it in one commit. Never add Attendance to the
sidebar or bottom navbar (PRD §3.1).

Phase 1 decisions (approved):

- `/absensi-saya` is a standalone page outside `UserLayout`; back button goes to `/user/home`.
- History uses a table at `md+` and cards below `md` (PRD §8.2).
- Banner maps `batch` → Kloter, `portionNumber` → No. Porsi, `zone` → Zona; no unbacked badges.
- Month/year filter options are derived from the records, not hardcoded calendars.

## Phase 1 — Frontend: jamaah role (mock data)

### 1.1 Contract & mock layer

- [x] Define UI record shape `{ id, eventId, eventName, eventDate, checkInTime, status }`
- [x] Add `src/data/mock/myAttendance.js`: 22 records total (18 hadir / 4 absen) — 20 in Jan 2026, 2 in Dec 2025 for the year filter
- [x] Add `src/utils/helpers/attendance.js`: `calculateAttendanceStats` (present, absent, total, percentage, >=75 flag)
- [x] Add `filterAttendanceRecords` + month/year option builders + status option constant
- [x] Add `formatShortDate` and `formatCheckInTime` to `dateConversion.js`

### 1.2 Entry point & routing

- [x] Create `src/pages/user/AbsensiSayaPage.jsx`
- [x] Export it from `src/pages/user/index.js`
- [x] Register `/absensi-saya` under `ProtectedRoute user` + `RequiredCompletedIdentity`
- [x] Add "Absensi Saya" item to the `user` branch of `featureMenu.js`
- [x] Back button returns to `/user/home`

### 1.3 UI components (mobile-first)

- [x] `AttendancePageHeader` — back arrow, "SIMAK KARAWANG", "Absensi Saya", avatar
- [x] `JamaahPersonaCard` — mosque glyph, Kloter badge, name, No. Porsi / Zona
- [x] `AttendanceStatGrid` — Total Hadir & Total Absen gradient cards
- [x] `AttendanceRateCard` — SVG ring, progress bar, "Memenuhi Syarat Minimal (75%)", status chip
- [x] `AttendanceFilterBar` — Bulan / Tahun / Status selects, styled with project tokens
- [x] `AttendanceHistorySection` — heading, "N Sesi" chip, table/card switch
- [x] `AttendanceHistoryTable` (md+) reusing `components/ui/global/Table.jsx`
- [x] `AttendanceHistoryCard` (< md): event name, date, check-in time (`-` if absent), status
- [x] `AttendanceStatusBadge` wrapping `getAttendanceStatus()` with check/cancel icon
- [x] `AttendanceEmptyState` — "Belum Ada Riwayat Absensi" + "Atur Ulang Filter"
- [x] Footer "Persyaratan Kehadiran Istitha'ah" note card (`AttendanceRequirementNote`)

### 1.4 State, filtering, edge states

- [x] `useMyAttendance` hook with `isSubscribed` cleanup guard
- [x] Filter state + `useMemo` derivation; options derived from records
- [x] Stats stay all-time while filters affect only the list
- [x] Skeleton loading state (`AttendanceSkeleton`)
- [x] Error state with retry (`AttendanceErrorState`)
- [x] Empty state on zero filtered rows + reset works
- [x] Graceful fallback when `fullName`/`batch`/`portionNumber` are null

### 1.5 Verification

- [x] `npm run build` passes (no new warnings beyond the known baseline)
- [x] `npm run lint` adds no new errors beyond the 6 known ones
- [x] Manual: 360 px, 768 px, 1280 px layouts; filter combinations; empty state; back button
- [x] Menu grid → Absensi Saya opens for `user` role only

## Phase 2 — Frontend: admin & leader role

Execution is incremental. Each step ends with `npm run build` + `npm run lint`
(no new errors beyond the 6 known `react-hooks/set-state-in-effect` baseline errors)
and is reviewed before the next step starts.

Phase 2 decisions (approved):

- **Routes:** one shared set `/absensi/*` for `admin` + `leader`, wrapped by
  `src/layouts/AttendanceLayout.jsx`. No per-role page or component duplication.
- **Date filter:** derived `Bulan` + `Tahun` selects (options built from the data, per Phase 1),
  not a date-range picker.
- **Event Detail:** `admin` gets an extra `Zona` select in the participant filter bar; `leader`
  gets a locked zone chip and no select.
- **Jamaah History stats:** exactly 2 derived cards (`Hadir`, `Absen`). No "Tingkat Disiplin" card.
- **Congregation Data entry link:** deferred. Only Event Detail links into Jamaah History for now,
  so no unrelated files are touched.
- **Export / print / QR-scanner buttons** from the mockups are omitted (PRD §13, §3.1).
- **Shared feature code** lives outside the role folders: `src/pages/attendance/`,
  `src/components/attendance/`, `src/hooks/attendance/`, `src/features/attendance/`,
  `src/utils/helpers/attendanceRecap.js`.

### 2.1 Step 1 — API contract (docs only, no code)

- [x] Create `docs/api-contract-admin-leader-attendance.md`
- [x] Transport: `POST <VITE_API_BASE_URL>/{admin,leader}.php`, JSON body, `action` multiplexing, `withCredentials: true` → `PHPSESSID`, no query string, no `Authorization` header
- [x] Error envelope: every failure is HTTP 200 + `{ "status": "failed", "message": "<Indonesian>" }` (no/expired session, wrong role, leader zone unset, jamaah outside leader zone, invalid `event_id` / `user_id`)
- [x] Document `get_attendance_recap` — `{ action, page, per_page, search, month, year, zone? }` → `{ status, data: { stats, events[], pagination, scope, filters } }`; `zone` is admin-only (ignored/rejected for leader)
- [x] Document `get_event_attendance_detail` — `{ action, event_id, page, per_page, search, status, zone? }` → `{ data: { event, stats, participants[], pagination } }`; leader stats are the zone subset
- [x] Document `get_jamaah_attendance_history` — `{ action, user_id, page, per_page, month, status }` → `{ data: { jamaah, stats, records[], pagination } }`
- [x] Document business rules: completed (`selesai`) events only (§5.2), absent rows for post-event registrants (§5.3), `region_id` snapshot at attendance time (§5.4), unique `(user_id, event_id)` (§5.6), stats ignore filters
- [x] Document backend ↔ UI field mapping aligned with the real event payload (`eventName`, `date`, `timeStart`, `timeEnd`, `location`, `zone`, `status`)
- [x] Document which `src/utils/{admin,leader}/api.js` function calls which action and which hook consumes it

### 2.2 Step 2 — Data foundation (invisible, no UI)

Helpers — `src/utils/helpers/attendanceRecap.js`:

- [x] `resolveAttendanceScope(user)` → `{ role, zone, isZoneLocked, isBlocked }` using `user.zone ?? user.zone_leader`
- [x] `applyAttendanceScope(rows, scope)` defensive client-side filter
- [x] `getAttendanceHomeRoute(role)` → `/admin/home` | `/leader/home` (local helper; do **not** patch `getHomeRoute`)
- [x] `isCompletedEvent` (`selesai`, with `completed` alias tolerated)
- [x] Normalizers for recap event rows, participants, and jamaah history rows (tolerant of snake_case, reusing `attendance.js` helpers)
- [x] `calculateRecapStats` (totalEvents / totalPresent / totalAbsent / percentage) and `calculateParticipantStats`
- [x] `filterRecapEvents`, `filterParticipants`, `filterJamaahHistory`
- [x] `getRecapFilterOptions` (month/year/zone derived from data), `paginateRows`, `getInitials`, `getPercentageTone`

Mock — `src/data/mock/attendanceRecap.js`:

- [x] 8–10 `selesai` events (Jan–Feb 2026) + 1–2 `live` / `mendatang` to prove the exclusion rule
- [x] Seeded jamaah across zones A–F; deterministic participant derivation (no `Math.random` at render)
- [x] Mock honors the scope: leader sees only their zone; out-of-zone jamaah history returns `status: 'failed'`

Hooks — `src/hooks/attendance/`:

- [x] `useAttendanceRecap.js` → `{ events, stats, filterOptions, isLoading, error, refetch }`
- [x] `useEventAttendanceDetail.js` → `{ event, participants, stats, isLoading, error, refetch }`
- [x] `useJamaahAttendanceHistory.js` → `{ jamaah, records, stats, isLoading, error, refetch }`
- [x] All three use the same `isSubscribed` cleanup guard as `useMyAttendance`
- [x] All three accept `scope` from `resolveAttendanceScope(user)` and keep the final shape so Phase 3 is a one-line swap

### 2.3 Step 3 — Shared UI + route shell + Attendance Recap (first visible milestone)

Shell & routing:

- [x] `src/layouts/AttendanceLayout.jsx` — `useAuth()` role → `<Navigation role={role} />` + `<Header />` + `<Outlet />` (same structure as `AdminLayout`)
- [x] `src/pages/attendance/index.js` barrel
- [x] `src/components/attendance/index.js` barrel (single barrel for the whole feature)
- [x] Register `/absensi/rekap-kehadiran` under `ProtectedRoute allowedRoles={['admin','leader']}`
- [x] Point admin & leader "Rekap Absen" menu to `/absensi/rekap-kehadiran` (2 lines in `featureMenu.js`)
- [x] No sidebar / bottom-nav item added; `Navigation.jsx` and `navbar.js` untouched

Shared UI — `src/components/attendance/shared/`:

- [x] ~~`AttendancePageHeader.jsx`~~ — removed in the Step 3 cleanup; pages now use `BackButton` + an inline `<header>`
- [x] `AttendanceStatCards.jsx` — config-driven (2/3/4 cards), existing gradient palette
- [x] `AttendanceRateBar.jsx` — `role="progressbar"` + aria values
- [x] `AttendanceStatusTabs.jsx` — `aria-pressed` toggle group with counts
- [x] `AttendancePagination.jsx` — `<nav aria-label>`, `aria-current="page"`
- [x] `AttendanceRecapState.jsx` — loading skeleton + empty + error/retry in ONE file
- [x] Reuse `Table`, `SeacrhInput`, `InlineFilterBar`, `AttendanceStatusBadge`, `StatisticContainer`

Recap page:

- [x] `src/pages/attendance/AttendanceRecapPage.jsx` — filter state + `useMemo` derivation
- [x] `recap/AttendanceRecapFilters.jsx` — search + Bulan/Tahun via `InlineFilterBar` + static "Selesai (n)" chip
- [x] `recap/AttendanceRecapTable.jsx` — No, Kegiatan, Tanggal, Hadir, Tidak Hadir, Persentase, Aksi
- [x] `recap/AttendanceRecapCard.jsx` — mobile card with the same fields
- [x] `recap/AttendanceRecapSection.jsx` — table at `md+`, cards below `md`, pagination footer
- [x] `src/features/attendance/AttendanceRecapColumns.jsx`
- [x] 4 stat cards from `selesai` events only; upcoming/live excluded
- [x] Scope pill: admin "Semua Zona (Kab. Karawang)", leader locked zone
- [x] Pagination 10/page; reset page on filter change
- [x] No "Unduh Laporan" button (PRD §13)

### 2.4 Step 4 — Event Details

- [x] `src/pages/attendance/EventAttendanceDetailPage.jsx`
- [x] Route `/absensi/rekap-kehadiran/:eventId`
- [x] Header: back to recap, event name, `Selesai` badge, date, `timeStart–timeEnd`, location (no QR / export buttons)
- [x] 4 participant stat cards, recomputed on the leader's zone subset
- [x] `eventDetail/EventParticipantFilters.jsx` — search + `AttendanceStatusTabs`; admin-only `Zona` select, leader locked zone chip
- [x] `eventDetail/EventParticipantTable.jsx` — No, Nama, Wilayah, Waktu Absen, Status
- [x] `eventDetail/EventParticipantCard.jsx` — mobile card
- [x] `eventDetail/EventParticipantSection.jsx` — table/cards switch + pagination
- [x] `src/features/attendance/EventParticipantColumns.jsx`
- [x] Congregant name links to `/absensi/riwayat-jamaah/:userId` with `state.from`
- [x] Invalid `eventId` → error state with retry/back

### 2.5 Step 5 — Jamaah History

- [x] `src/pages/attendance/JamaahAttendanceHistoryPage.jsx`
- [x] Route `/absensi/riwayat-jamaah/:userId`
- [x] `jamaahHistory/JamaahHistoryIdentity.jsx` — name + zona only, initials avatar (no documents/profile duplication, no unbacked verification badges)
- [x] Exactly 2 stat cards (`Hadir`, `Absen`) — no "Tingkat Disiplin"
- [x] `jamaahHistory/JamaahHistoryFilters.jsx` — search + Bulan + `AttendanceStatusTabs`
- [x] `jamaahHistory/JamaahHistoryTable.jsx` — No, Kegiatan, Tanggal, Waktu Absen, Status
- [x] `jamaahHistory/JamaahHistoryCard.jsx` — mobile card
- [x] `jamaahHistory/JamaahHistorySection.jsx` — table/cards switch + pagination
- [x] `src/features/attendance/JamaahHistoryColumns.jsx`
- [x] Back via `location.state.from`, fallback `/absensi/rekap-kehadiran`
- [x] Leader opening a jamaah outside their zone → error state
- [x] Congregation Data entry link: DEFERRED (do not touch `ProfileDetail.jsx`)

### 2.6 Step 6 — API client wiring (still mock-backed)

- [ ] `withCredentials: true` on the axios instance in `src/utils/admin/api.js`
- [ ] `withCredentials: true` on the axios instance in `src/utils/leader/api.js`
- [ ] Add `getAttendanceRecapAPI`, `getEventAttendanceDetailAPI`, `getJamaahAttendanceHistoryAPI` to `src/utils/admin/api.js`
- [ ] Add the same three to `src/utils/leader/api.js` (leader omits `zone`)
- [ ] Hooks keep the mock source by default so Phase 3 is a flag flip

### 2.7 Step 7 — Verification

- [ ] Role matrix: admin = all zones, leader = own zone only, jamaah redirected to `/user/home`, unknown → `/login`
- [ ] Leader direct-URL manipulation returns scoped or error data, never another zone
- [ ] Leader without `user.zone` → "Zona belum ditetapkan" state, never all-zone fallback
- [ ] `npm run build` passes (no new warnings beyond the known baseline)
- [ ] `npm run lint` adds no new errors beyond the 6 known ones
- [ ] Responsive pass 360 / 768 / 1280 on all three pages
- [ ] Empty, error, retry, and zero-filter-match states on all three pages
- [ ] No Attendance item added to sidebar or bottom navbar

## Phase 3 — Backend & API integration

### 3.1 Backend inspection & contract

- [ ] Inspect `attendances`, events, users tables, QR scan flow, production data
- [ ] Choose between `event_attendance_records` (PRD §6.1) and deriving from `attendances`
- [x] Confirm endpoint convention (flat PHP `user.php` / `admin.php` / `leader.php` + `action`, not the REST paths in PRD §7)
- [x] Document the jamaah attendance contract in `docs/api-contract-attendance.md` (agreed + implemented on the frontend)
- [ ] Agree admin/leader request/response payloads incl. stats, filters, pagination, region scoping with the backend (see `docs/api-contract-admin-leader-attendance.md`, Phase 2 Step 1)

### 3.2 Frontend integration

- [x] Add `getMyAttendance` to `src/utils/user/api.js` (POST `user.php`, `{ action: 'get_my_attendance' }`, session cookie, no `user_id`)
- [ ] Add recap / event-detail / congregant-history calls to admin & leader clients (Phase 2, Step 6)
- [x] Swap `useMyAttendance` mock for the real endpoint, keep `{ stats, records }` shape
- [ ] Swap the three admin/leader hooks from `src/data/mock/attendanceRecap.js` to the real actions
- [ ] Delete `src/data/mock/attendanceRecap.js` and the mock branch
- [ ] Send filters + pagination to the API instead of filtering client-side
- [x] Delete `src/data/mock/myAttendance.js` and mock branches
- [ ] Re-verify loading / empty / error / retry against real responses
  - Failure path verified with curl: `POST user.php` without a session returns HTTP 200 +
    `status: "failed"` + Indonesian message, which now renders the error state. Success/empty
    still need a logged-in jamaah session.

### 3.3 Security & regression

- [x] Jamaah endpoint ignores any client-supplied `userId` (request now sends `action` only)
- [ ] Leader region enforcement verified with manipulated requests
- [ ] Leader request that sends `zone` / `user_id` is ignored or rejected by the backend
- [ ] Attendance recap excludes `live` / `mendatang` events against real data
- [ ] Region snapshot (`region_id`) preserved when a jamaah changes zone
- [ ] QR scan → recap reflects Present + `waktu_absen`
- [ ] Absent rows appear for post-event registrants (PRD §5.3) and region history is preserved (§5.4)
- [ ] Full manual regression of existing event/material/scan flows
