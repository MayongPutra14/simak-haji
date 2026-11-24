# API Contract — Attendance (Absensi)

**Status:** Agreed and implemented on the frontend — `getMyAttendance` (`src/utils/user/api.js`) and
`useMyAttendance` consume this endpoint; the mock data source has been removed.
**Owner of this document:** frontend repo (`simak_haji`).
**Feature reference:** `docs/prd-attendance-recap-en.md` §5–§7, `docs/task.md` Phase 3.
**Scope of this document:** the contract the frontend **already** expects. It describes what the
backend must answer so that `src/hooks/user/useMyAttendance.js` can drive the page without any
further change to the components or helpers.

> Backend is a separate PHP repository. Do not treat PRD §7 (`GET /api/attendance/...`) as
> authoritative — it is a proposal. The real convention in this project is flat PHP files with
> an `action` field in a `POST` body (see `src/utils/{user,admin,leader}/api.js`). This contract
> follows the real convention.

---

## 1. Transport conventions

| Item                    | Value                                                 |
| ----------------------- | ----------------------------------------------------- |
| Method                  | `POST`                                                |
| URL                     | `<VITE_API_BASE_URL>/user.php`                        |
| Dev base URL            | `http://localhost/simak_api/api` (`.env.development`) |
| Prod base URL           | `https://simak-api.my.id/api` (`.env.production`)     |
| Query string            | **None.** All parameters go in the JSON body.         |
| Request `Content-Type`  | `application/json`                                    |
| Response `Content-Type` | `application/json; charset=utf-8`                     |
| Client                  | `api` axios instance in `src/utils/user/api.js`       |

The endpoint is a single file, multiplexed by `body.action`. This mirrors
`get_profile`, `get_events`, `submit_attendance`, etc.

### 1.1 Auth: current reality vs. required target

**Current reality (verified in code):**

- `src/utils/user/api.js` creates axios with `withCredentials: true` and
  `Content-Type: application/json`. The browser therefore sends the PHP session cookie
  (`PHPSESSID`) automatically once `login.php` has started a session.
- There are **no** request interceptors and no `Authorization` header anywhere in `src/`.
  `localStorage.user_data` is UI state only — it is not proof of identity.
- `login.php` returns the user object that is persisted as `user_data`; the frontend does not
  read or forward a token.

**Required target (backend must implement, PRD §7.4 and §10.1):**

- The endpoint must resolve the caller from the PHP session and ignore any client-supplied
  identity. `get_my_attendance` therefore accepts **no** `user_id`.
- If the session is missing, expired, or belongs to a non-`user` role, reply HTTP 200 with
  `status: "failed"` and an Indonesian `message` (confirmed backend behaviour).
- Do not trust `localStorage`, a request body id, or anything else the client can edit.
- If a token replaces cookies later, the frontend needs a follow-up change
  (`Authorization: Bearer <token>`); that is **not** part of this contract.

Request headers the backend should expect today:

```
POST /simak_api/api/user.php HTTP/1.1
Content-Type: application/json
Cookie: PHPSESSID=...            # sent automatically (withCredentials: true)
```

---

## 2. Endpoint — `get_my_attendance`

Retrieves the logged-in congregant's own attendance history. Consumed by
`useMyAttendance(userId)` on `/absensi-saya` (`src/pages/user/UserAttendancePage.jsx`).

### 2.1 Request body

```json
{
  "action": "get_my_attendance"
}
```

| Field     | Type     | Required | Notes                                                                                                                        |
| --------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `action`  | `string` | yes      | Literal `"get_my_attendance"`.                                                                                               |
| `user_id` | —        | **no**   | Must **not** be sent. The PHP session cookie identifies the caller; a body-supplied id is ignored / rejected by the backend. |

No date, status, month, year, or pagination parameters. See §5 for why.

### 2.2 Success response

The JSON body is consumed **directly** — the hook reads `response.status` and `response.data`
at the root of the body. Do **not** wrap it in a second `{ "data": { ... } }` layer.

```json
{
  "status": "success",
  "message": "Riwayat absensi berhasil diambil.",
  "data": [
    {
      "id": 981,
      "eventId": "17",
      "eventName": "Kajian Manasik Haji Gelombang I",
      "eventDate": "2026-01-11",
      "checkInTime": "08:05",
      "status": "hadir"
    },
    {
      "id": 982,
      "eventId": "18",
      "eventName": "Kajian Fiqih Haji II",
      "eventDate": "2026-01-12",
      "checkInTime": null,
      "status": "absen"
    }
  ]
}
```

| Field     | Type                      | Nullable       | Rules                                                                                                                               |
| --------- | ------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | `"success"`               | no             | Envelope status. Anything else is treated as a failure (§2.3).                                                                      |
| `message` | `string`                  | yes on success | Not rendered on success; safe to include.                                                                                           |
| `data`    | `array<AttendanceRecord>` | **no**         | Must be an array. `[]` is valid and renders the empty state. **Never `null`** — `sortAttendanceRecords` spreads it and would throw. |

### 2.3 Failure response

Used for any application-level failure (invalid session, not a congregant, query error).

```json
{
  "status": "failed",
  "message": "Sesi login tidak valid, silakan login kembali."
}
```

| Field     | Type                    | Nullable | Rules                                                                                                                                          |
| --------- | ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | `"failed"` \| `"error"` | no       | Both are handled identically by the hook.                                                                                                      |
| `message` | `string`                | yes      | Shown verbatim in the error state, so it must be **Indonesian and user-facing**. Falls back to `"Gagal memuat riwayat absensi."` when omitted. |

### 2.4 HTTP status codes — important

The hook's `catch` block uses `error.message` (the axios message), **not**
`error.response.data.message`. Therefore:

- Application failures should return **HTTP 200** with `status: "failed" | "error"` inside the
  body, which is what the rest of this codebase already does. The Indonesian message then
  reaches the UI.
- If the backend returns `4xx`/`5xx`, axios throws and the UI shows a generic string such as
  `"Request failed with status code 500"`. The error state still renders and retry works, but
  the copy is wrong. If auth must fail with `401`, accept that Phase 3 will need response-to-
  message mapping in `src/utils/user/api.js`. Do not silently return `200` for an unauthenticated
  caller: pick one strategy and document it in the backend repo.

---

## 3. `AttendanceRecord` — exact UI shape

Every `data[]` element is mapped 1:1 into the UI record consumed by the hook, table, and cards.

| Field         | Type                   | Nullable | Format / rules                                                                                                                                                                                                                   |
| ------------- | ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `number` \| `string`   | no       | Unique per row; used as the React list key and table row key. Must be stable for the same event+user pair.                                                                                                                       |
| `eventId`     | `number` \| `string`   | no       | Event identifier. Used for navigation to event detail later. Must be unique within one user's list (PRD §5.6: one row per `user_id` + `event_id`).                                                                               |
| `eventName`   | `string`               | no       | Display name, ready to render. Do not send HTML entities that need decoding. Can be empty only if the event genuinely has no title; prefer a fallback like `"Kegiatan Tanpa Judul"` server-side.                                 |
| `eventDate`   | `string`               | no       | Calendar date of the event, **`YYYY-MM-DD`**. Not `DD-MM-YYYY`, not a localized string. Used for sorting (§4.2), month/year filter derivation (§4.3), and display. A `YYYY-MM-DD HH:mm:ss` value still works but is discouraged. |
| `checkInTime` | `string` \| `null`     | yes      | Local Jakarta time (`Asia/Jakarta`, WIB) as **`HH:mm`** (24-hour). `null` when `status` is `absen`. `HH:mm:ss` is tolerated by the formatter; `-`, `""`, or `"00:00"` are not acceptable substitutes for `null`.                 |
| `status`      | `"hadir"` \| `"absen"` | no       | Lowercase Indonesian enum, exactly these two values. See §5.1 — any third value silently becomes "absent".                                                                                                                       |

Nullability summary for the UI layer:

- `fullName`, `batch`/kloter, `portionNumber`, `zone` come from `user_data`, **not** from this
  endpoint; they are already null-safe in the page banner. Do not duplicate them here.
- Only `checkInTime` may be `null`.

### 3.1 If the backend must use snake_case

Returning the UI shape above is the lowest-risk option because Phase 3 only swaps the `fetch`
inside the hook. If the backend prefers database-style keys, return the same values as:

```json
{
  "id": 981,
  "event_id": 17,
  "event_nama": "...",
  "event_tanggal": "2026-01-11",
  "waktu_absen": "08:05",
  "status": "hadir"
}
```

…then map it in `src/utils/helpers/attendance.js` (`normalizeAttendanceRecords`, already
implemented and called by the hook) before it reaches the UI. The hook contract (`records` in
camelCase) must not change. The normalizer also converts `"NULL"`/empty `waktu_absen` to `null`
and derives `status` from the check-in time when the field is missing.

---

## 4. How the frontend consumes the payload

Source: `src/hooks/user/useMyAttendance.js`, `src/utils/helpers/attendance.js`.

### 4.1 Envelope handling

```
response.status === 'success'  -> records = sortAttendanceRecords(response.data)
response.status !== 'success'  -> error  = response.message
network / non-2xx              -> error  = error.message (axios)
```

`userId` falsy means the request is never sent; the hook stays idle. The page returns `null`
before rendering when `user` is missing.

### 4.2 Sorting

`sortAttendanceRecords` sorts **newest event date first** using
`new Date(eventDate)`. Ties keep the backend order (stable sort). Backend order is therefore
only a tie-breaker; `eventDate` must be parseable by `Date`.

### 4.3 Filter options

`getAttendanceFilterOptions` derives dropdown options from the records themselves:

- `years` from `eventDate.split('-')[0]`, in first-seen order (newest first).
- `months` from `eventDate.split('-')[1]`, in first-seen order, labelled with Indonesian month
  names (`MONTH_LABELS`), and **de-duplicated across years** (a month appears once even if it
  exists in two years).
- Both lists are prefixed with an "all" option (`value: 'all'`).

Consequence: a malformed `eventDate` produces a garbage or missing filter option. There is no
hardcoded calendar.

### 4.4 Business rule for stats

`calculateAttendanceStats(records)` runs on the **full, unfiltered** list:

| Output              | Formula                                                                  |
| ------------------- | ------------------------------------------------------------------------ |
| `totalPresent`      | count of records where `status === 'hadir'`                              |
| `totalAbsent`       | `records.length - totalPresent`                                          |
| `totalRecords`      | `totalPresent + totalAbsent` (always `records.length`)                   |
| `percentage`        | `totalRecords === 0 ? 0 : Math.round(totalPresent / totalRecords * 100)` |
| `minimumPercentage` | constant `75` (`ATTENDANCE_MIN_PERCENTAGE`)                              |
| `isEligible`        | `totalRecords > 0 && percentage >= 75`                                   |

The page applies month/year/status filters only to the visible list. Stats and the 75% ring
never change when a filter changes.

---

## 5. Business rules the backend must honour

### 5.1 Only two statuses exist

Because `totalAbsent` is derived by subtraction, a record with `status: "izin"`, `"sakit"`,
`"pending"`, or `null` is counted as absent. Until the frontend is changed:

- Return exactly `"hadir"` or `"absen"`.
- If a leave/sick category is introduced later, it is a **breaking change** requiring a new
  helper and stats decision. Do not ship it behind this contract.

### 5.2 Completed events only (PRD §5.2)

Only events whose status is completed (`selesai`) may appear. Upcoming (`mendatang`) and live
(`live`) events must be excluded. This includes events where the congregant already scanned in —
an in-progress event is still excluded.

### 5.3 Absent rows must exist as data (PRD §5.3, §6.2)

The legacy `attendances` table only stores successful scans, so absence cannot be derived from
it alone. The endpoint must return one row per (congregant, completed event in scope), with
`checkInTime: null` and `status: "absen"` when there is no scan. Two implementation options:

1. Materialize `event_attendance_records` (PRD §6.1) and read it directly.
2. Derive at query time: `completed events × congregants in scope` left-joined to
   `attendances`.

Either is acceptable to the frontend; the response shape is identical. Congregants who register
**after** an event completed must still receive an absent row for that event.

### 5.4 Region is historical (PRD §5.4)

If a congregant changes region, historical rows must not be rewritten. The region is captured at
attendance time (today via `attendances`/event scope, target `event_attendance_records.region_id`).
This endpoint does not return region, but leader-scoped endpoints in the appendix must use that
historical value, not the user's current region.

### 5.5 One row per event (PRD §5.6)

Enforce `UNIQUE (user_id, event_id)`. Duplicate rows would double-count in the stats and produce
duplicate React keys.

### 5.6 Timezone

`waktu_absen` is stored in server/database time. Return it already converted to **`Asia/Jakarta`
WIB** and formatted `HH:mm`. The frontend performs no timezone conversion — `formatCheckInTime`
only splits the string and appends `WIB`. Sending UTC or a full ISO timestamp with offset will
display the wrong hour.

### 5.7 Region / role scope

For this endpoint the scope is always the authenticated congregant. Regional scoping applies to
the admin/leader endpoints (appendix). The backend must reject a congregant session calling
admin/leader actions (return `status: 'failed'` with an Indonesian message).

### 5.8 No server-side filtering or pagination yet

The contract intentionally has **no** `month`, `year`, `status`, `page`, or `limit` parameters,
because:

- Stats must cover the complete history; paginating `records` would silently shrink
  `totalPresent`/`totalAbsent`/`percentage`.
- Month/year options are derived from the records; a filtered response would shrink the
  dropdown options too.
- Current volume is per-congregant event history (tens of rows), not a global table.

If volume ever requires pagination, the response must be extended in a **breaking** version:
`{ stats: {...}, data: [...], meta: { page, limit, total, totalPages } }`, and the hook must be
changed to consume `stats` from the server. Do not paginate `data` under this contract.

---

## 6. Backend acceptance checklist

- [ ] `POST user.php` with `action: "get_my_attendance"` returns HTTP 200 and the envelope in §2.2.
- [ ] `data` is always an array, `[]` for a congregant with no completed events.
- [ ] `data[].status` is only `"hadir"` or `"absen"`.
- [ ] `data[].eventDate` is `YYYY-MM-DD`; `checkInTime` is `HH:mm` in WIB or `null`.
- [ ] `data[].id` is unique; `(user_id, event_id)` has no duplicates.
- [ ] Completed events only; absent rows exist for non-scanners, including late registrants.
- [ ] `user_id` in the body is ignored/rejected; the session cookie determines the caller and another user's records are never returned.
- [ ] Failure messages are Indonesian and arrive in the body (`status: "failed" | "error"`).
- [ ] A revoked/invalid session cannot obtain data (document the chosen 200-vs-401 strategy).

---

## 7. Appendix — remaining attendance endpoints (proposed, not yet consumed)

Phase 2/3 of the frontend will add admin and leader pages. These actions do not exist in
`src/` yet; listed here so the backend can design them in one pass. All are `POST` to
`admin.php` / `leader.php` with an `action` field, and reuse the same `AttendanceRecord` shape
plus aggregates. Leader calls also send `leader_id` and `zone` (existing client convention,
`src/utils/leader/api.js`); the backend must still derive region from the leader session, never
from `zone` alone.

| Action                        | File                      | Purpose                        | Key request fields                                                        | Proposed response payload                                                                                                                                                                                                    |
| ----------------------------- | ------------------------- | ------------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_attendance_recap`        | `admin.php`, `leader.php` | Event list + global stats      | `search`, `date_from`, `date_to`, `status`, `page`, `limit`               | `{ stats: { totalEvents, totalPresent, totalAbsent, percentage }, data: [{ eventId, eventName, eventDate, totalPresent, totalAbsent, percentage }], meta: { page, limit, total, totalPages } }`                              |
| `get_attendance_event_detail` | `admin.php`, `leader.php` | One event + participant list   | `event_id`, `status` (`all`\|`hadir`\|`absen`), `search`, `page`, `limit` | `{ event: { eventId, eventName, eventDate, startTime, endTime }, stats: { totalCongregants, totalPresent, totalAbsent, percentage }, data: [{ userId, fullName, regionId, regionName, checkInTime, status }], meta: {...} }` |
| `get_attendance_user_history` | `admin.php`, `leader.php` | One congregant's event history | `user_id`, optional `year`, `month`                                       | `{ user: { userId, fullName, regionName }, data: [AttendanceRecord], meta: {...} }`                                                                                                                                          |

Notes for those endpoints:

- `percentage` is always `Math.round(present / (present + absent) * 100)`, with `0` when the
  denominator is `0`. Keep rounding identical to §4.4 so the numbers match between pages.
- Recap stats and list must use the same filter and region scope, otherwise card totals and
  table rows disagree.
- Leader responses must be region-scoped by the backend. A manipulated `event_id` or `user_id`
  outside the leader's region must return `status: 'failed'`, not an empty success that leaks
  existence.
- Admin/leader lists are the only places where pagination is appropriate (PRD §10.2).
