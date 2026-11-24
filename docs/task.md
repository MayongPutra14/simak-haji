# Task Tracking — Absensi (Attendance Recap)

Refs: `docs/prd-attendance-recap-en.md`, `docs/stich-jamaah-mockup.html`
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

### 2.1 Route shell (open decision: shared `/absensi/*` vs role-prefixed paths)

- [ ] Decide and document the admin/leader layout wrapper (shared page, role-aware nav)
- [ ] Point admin & leader "Rekap Absen" menu to `/absensi/rekap-kehadiran`
- [ ] Register `/absensi/rekap-kehadiran`, `/absensi/rekap-kehadiran/:eventId`, `/absensi/riwayat-jamaah/:userId`
- [ ] Guard routes with `ProtectedRoute` for `admin` & `leader`

### 2.2 Attendance Recap

- [ ] 4 statistic cards (Total Events / Present / Absent / Rate) from completed events only
- [ ] Search by event name, date-range filter, status filter
- [ ] Event recap table (No, Name, Date, Present, Absent, Percentage, Action) + mobile cards
- [ ] Pagination
- [ ] Leader: no region filter (enforced server-side later)

### 2.3 Event Details

- [ ] Header with back button, event name, date, time
- [ ] 4 participant statistic cards
- [ ] Participant list (Name, Region, Check-in Time, Status) + mobile cards
- [ ] All / Present / Absent status filter
- [ ] Congregant name links to Congregant History

### 2.4 Congregant History

- [ ] Identity header limited to name + region (no profile/document duplication)
- [ ] Event history list (No, Event, Date, Check-in, Status) + mobile cards
- [ ] Back mechanism to the originating page
- [ ] Entry link from the existing Congregation Data detail page

### 2.5 Verification

- [ ] Role matrix: admin sees all, leader sees own region only, jamaah blocked
- [ ] `npm run build` / `npm run lint` clean vs. baseline
- [ ] Responsive pass on all three pages

## Phase 3 — Backend & API integration

### 3.1 Backend inspection & contract

- [ ] Inspect `attendances`, events, users tables, QR scan flow, production data
- [ ] Choose between `event_attendance_records` (PRD §6.1) and deriving from `attendances`
- [x] Confirm endpoint convention (flat PHP `user.php` / `admin.php` / `leader.php` + `action`, not the REST paths in PRD §7)
- [x] Document the jamaah attendance contract in `docs/api-contract-attendance.md` (agreed + implemented on the frontend)
- [ ] Agree request/response payloads incl. stats, filters, pagination, region scoping with the backend

### 3.2 Frontend integration

- [x] Add `getMyAttendance` to `src/utils/user/api.js` (POST `user.php`, `{ action: 'get_my_attendance' }`, session cookie, no `user_id`)
- [ ] Add recap / event-detail / congregant-history calls to admin & leader clients
- [x] Swap `useMyAttendance` mock for the real endpoint, keep `{ stats, records }` shape
- [ ] Send filters + pagination to the API instead of filtering client-side
- [x] Delete `src/data/mock/myAttendance.js` and mock branches
- [ ] Re-verify loading / empty / error / retry against real responses
  - Failure path verified with curl: `POST user.php` without a session returns HTTP 200 +
    `status: "failed"` + Indonesian message, which now renders the error state. Success/empty
    still need a logged-in jamaah session.

### 3.3 Security & regression

- [x] Jamaah endpoint ignores any client-supplied `userId` (request now sends `action` only)
- [ ] Leader region enforcement verified with manipulated requests
- [ ] QR scan → recap reflects Present + `waktu_absen`
- [ ] Absent rows appear for post-event registrants (PRD §5.3) and region history is preserved (§5.4)
- [ ] Full manual regression of existing event/material/scan flows
