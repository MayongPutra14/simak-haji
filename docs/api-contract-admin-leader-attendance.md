# API Contract — Admin & Leader Attendance Recap

**Status:** Draft for backend review. The frontend Phase 2 pages are built against this contract
with a local mock (`src/data/mock/attendanceRecap.js`); Phase 3 swaps the mock for the real
actions without changing the hooks or UI.
**Owner of this document:** frontend repo (`simak_haji`).
**Feature reference:** `docs/prd-attendance-recap-en.md` §4–§7, `docs/task.md` Phase 2 Step 1.
**Related contract:** `docs/api-contract-attendance.md` (jamaah `get_my_attendance`, already
implemented).

> Backend is a separate PHP repository. PRD §7 (`GET /api/attendance/...`) is a proposal, not the
> project convention. The real convention is flat PHP files with a `POST` body multiplexed by
> `action`, as used by `login.php`, `user.php`, `admin.php`, and `leader.php`. This contract
> follows the real convention.

---

## 1. Transport conventions

| Item                    | Admin                                   | Leader                                   |
| ----------------------- | --------------------------------------- | ---------------------------------------- |
| Method                  | `POST`                                  | `POST`                                   |
| URL                     | `<VITE_API_BASE_URL>/admin.php`         | `<VITE_API_BASE_URL>/leader.php`         |
| Dev base URL            | `http://localhost/simak_api/api`        | same                                     |
| Prod base URL           | `https://simak-api.my.id/api`           | same                                     |
| Query string            | **None.** All parameters go in the body. | same                                    |
| Request `Content-Type`  | `application/json`                      | same                                     |
| Response `Content-Type` | `application/json; charset=utf-8`       | same                                     |
| Client                  | `api` axios instance in `src/utils/admin/api.js` | `api` in `src/utils/leader/api.js` |
| Auth                    | PHP session cookie (`PHPSESSID`)         | same                                     |

Each file is a single endpoint multiplexed by `body.action`.

### 1.1 Authentication and session

- `withCredentials: true` is **required** so the browser sends `PHPSESSID` after `login.php`
  starts a session. `src/utils/user/api.js` already does this; `src/utils/admin/api.js` and
  `src/utils/leader/api.js` must add it in Phase 2 Step 6.
- There is no request interceptor and no `Authorization` header anywhere in `src/`. Do not
  introduce a token in this contract.
- `localStorage.user_data` is UI state only. It is not proof of identity.
- The backend must resolve the caller from the PHP session and derive the role and leader zone
  from the server-side record. Never trust `role`, `zone`, `leader_id`, or `user_id` from the
  request body for authorization.

Request headers the backend should expect:

```
POST /simak_api/api/admin.php HTTP/1.1
Content-Type: application/json
Cookie: PHPSESSID=...            # sent automatically (withCredentials: true)
```

### 1.2 `action` values

| Action                           | File                      | Purpose                                  |
| -------------------------------- | ------------------------- | ---------------------------------------- |
| `get_attendance_recap`           | `admin.php`, `leader.php` | Completed event list + global stats      |
| `get_event_attendance_detail`    | `admin.php`, `leader.php` | One event + participant list             |
| `get_jamaah_attendance_history`  | `admin.php`, `leader.php` | One jamaah's event history               |

One event action, one participant action, and one history action — no REST paths, no nested
resources.

---

## 2. Response envelope and errors

### 2.1 Success

All three actions return the same envelope:

```json
{
  "status": "success",
  "message": "Rekap kehadiran berhasil diambil.",
  "data": {}
}
```

- `status` is exactly `"success"`.
- `message` is optional and not rendered on success.
- `data` is required and is an object per action (§5–§7). Unlike `get_my_attendance`, `data` is
  **not** an array at the root.

### 2.2 Failure

Every application failure is **HTTP 200** with:

```json
{
  "status": "failed",
  "message": "Zona belum ditetapkan. Silakan hubungi admin."
}
```

| Field     | Type                    | Rules                                                                 |
| --------- | ----------------------- | --------------------------------------------------------------------- |
| `status`  | `"failed"` \| `"error"` | Both are handled identically by the hooks.                            |
| `message` | `string`                | Indonesian and user-facing. It is rendered verbatim in the error UI.  |

Do **not** return `4xx`/`5xx` for expected application failures. Axios throws on non-2xx and the
hook would display the generic axios message instead of the Indonesian copy. Reserve `4xx`/`5xx`
for genuine infrastructure errors only.

### 2.3 Required failure cases

| Condition                                             | Action(s)                       | Recommended message                                               |
| ----------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------- |
| No session / expired session                          | all                             | `Sesi login tidak valid, silakan login kembali.`                  |
| Session belongs to a jamaah / wrong role              | all                             | `Anda tidak memiliki akses ke halaman ini.`                       |
| Leader has no zone in the database                    | all                             | `Zona belum ditetapkan. Silakan hubungi admin.`                   |
| Leader requests an event outside their zone           | event detail                    | `Anda tidak memiliki akses ke kegiatan di luar zona Anda.`        |
| Leader requests a jamaah outside their zone           | jamaah history                  | `Anda tidak memiliki akses ke data jamaah di luar zona Anda.`     |
| `event_id` missing / unknown / deleted                | event detail                    | `Kegiatan tidak ditemukan.`                                       |
| `event_id` belongs to a `live` / `mendatang` event    | event detail                    | `Rekap hanya tersedia untuk kegiatan yang telah selesai.`         |
| `user_id` missing / unknown / deleted                 | jamaah history                  | `Data jamaah tidak ditemukan.`                                    |
| Query / server error                                  | all                             | `Gagal memuat rekap kehadiran.` (adjust per action)               |

The failure message for an out-of-zone resource must be `status: "failed"`. Do **not** return an
empty success payload: that hides the difference between "no data" and "not allowed" and leaks
less, but makes the UI show the wrong empty state.

---

## 3. Roles, zones, and scope

### 3.1 Role matrix

| Role      | Recap                                                                 | Event detail                                          | Jamaah history                                            |
| --------- | --------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `admin`   | All completed events, all zones; optional `zone` filter.               | Any completed event; optional participant `zone` filter. | Any jamaah.                                            |
| `leader`  | Only their own zone. No zone filter.                                  | Only events in their zone; stats are the zone subset. | Only jamaah in their zone. Out-of-zone → `failed`.     |
| `user`    | Forbidden — `status: "failed"`. Use `user.php` `get_my_attendance`.    | Forbidden.                                            | Forbidden.                                                |

### 3.2 Leader zone enforcement

- The leader's zone must come from the session/database (`users.zone` or `leaders.zone_leader`),
  never from `body.zone`.
- `zone` is **admin-only** in these requests. A leader request that includes `zone` must have it
  ignored. It must never widen the result set. If the backend prefers strict input validation,
  reply `status: "failed"`; either behaviour is acceptable, but it must be consistent.
- A leader without a zone must get `status: "failed"` with the zone message. Never fall back to
  all-zone data.
- If `event.zone` is `NULL` (all-zone event), a leader may receive it only if the backend can
  recompute its totals for the leader's zone. Otherwise exclude it from that leader's recap.
- Participant `zone` / `regionName` in event detail must be the **historical attendance snapshot**
  (PRD §5.4), not the jamaah's current zone.

### 3.3 Frontend defence in depth

`resolveAttendanceScope(user)` (`src/utils/helpers/attendanceRecap.js`) produces:

```js
{ role, zone, isZoneLocked, isBlocked }
```

- `role` is lowercased.
- `zone` is read from `user.zone ?? user.zone_leader`, trimmed and uppercased, `null` if empty.
- `isZoneLocked` is `true` for `leader`.
- `isBlocked` is `true` when a leader has no zone.

`applyAttendanceScope(rows, scope)` removes rows whose zone is known and different from the
leader's zone. Rows without a zone stay in place because the backend is still responsible for
scoping open/all-zone data. This is a guard against UI bugs, **not** a substitute for backend
authorization (PRD §2.2, §10.1).

---

## 4. Shared field mapping

### 4.1 Event row

The event payload already used by the admin/leader event pages is the source of truth. Attendance
aggregates are added to it.

| Backend field                          | UI field (`normalizeRecapEvent`) | Format / rules                                                                                  |
| -------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `id` (or `eventId`)                    | `eventId`, `id`                  | Unique. Used as React key and `:eventId` route param.                                           |
| `eventName`                            | `eventName`                      | Display name, no HTML entities.                                                                 |
| `date`                                 | `eventDate`                      | `YYYY-MM-DD`. Falls back to the date part of `timeStart` when `date` is missing.                |
| `timeStart`                            | `timeStart`                      | `YYYY-MM-DD HH:mm:ss`. Used on the event detail header.                                         |
| `timeEnd`                              | `timeEnd`                        | `YYYY-MM-DD HH:mm:ss`.                                                                          |
| `location`                             | `location`                       | Free text; may be empty.                                                                        |
| `zone`                                 | `zone`                           | `A`–`F`, uppercased; `null` = all zones.                                                        |
| `status`                               | `status`, `isCompleted`          | `selesai` (completed), `live`, `mendatang`. `completed` is tolerated as an alias.                |
| `total_present` / `totalPresent`       | `totalPresent`                   | Integer ≥ 0. Number of attendance rows with `status: "hadir"` for this event in scope.          |
| `total_absent` / `totalAbsent`         | `totalAbsent`                    | Integer ≥ 0. Number of rows with `status: "absen"` in scope.                                    |
| `total_participants` / `totalParticipants` | `totalParticipants`          | Integer ≥ 0. Defaults to present + absent.                                                      |
| `percentage`                           | `percentage`                     | Integer 0–100, `Math.round(present / (present + absent) * 100)`, `0` when the denominator is 0. |

Rules:

- Only `selesai` events are ever returned by `get_attendance_recap`.
- `eventDate` must be parseable by `new Date()`; the frontend uses it for month/year filters and
  newest-first sorting.
- The frontend normalizer also accepts `event_name`, `event_date`, `event_tanggal`, `time_start`,
  `time_end`, `total_present`, etc. Prefer the camelCase keys above; snake_case support exists only
  to avoid blank pages during integration.

### 4.2 Participant row

| Backend field                     | UI field (`normalizeParticipant`) | Rules                                                                    |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `user_id` (or `userId`)           | `userId`, `id`                    | Unique within the event. Used to link to jamaah history.                 |
| `full_name` (or `fullName`)       | `fullName`                        | Display name.                                                            |
| `region_id`                       | `regionId`                        | **Historical** region id captured when attendance was recorded (§5.4).   |
| `region_name`                     | `regionName`                      | Historical display label for the `Wilayah` column.                       |
| `zone` / `region_zone`            | `zone`                            | Historical zone `A`–`F`, used for leader scoping and the admin filter.   |
| `waktu_absen` / `checkInTime`     | `checkInTime`                     | `HH:mm` WIB, or `null` for absent. Never `"00:00"`.                      |
| `status`                          | `status`                          | Exactly `hadir` or `absen`. English `present` / `absent` are tolerated.  |

The region fields must come from the attendance record's snapshot, not `JOIN users` on the
jamaah's current `zone` / `region_id`. A jamaah who moved from zone B to zone A must still appear
under zone B for old events.

### 4.3 Jamaah identity (`jamaah`)

| Backend field                     | UI field | Rules                                                        |
| --------------------------------- | -------- | ------------------------------------------------------------ |
| `user_id` / `userId`              | `userId` | Unique.                                                      |
| `full_name` / `fullName`          | `fullName` | Display name.                                              |
| `zone`                            | `zone`   | `A`–`F`. Used for the leader guard and the identity chip.    |
| `region_name`                     | `regionName` | Display label (`Wilayah A`).                             |
| `batch` / `kloter`                | `batch`  | Optional; tolerated but the Phase 2 UI does not show it.     |
| `portion_number` / `portionNumber` | `portionNumber` | Optional; tolerated but not shown.                     |

The Jamaah History page is **not** a profile page (PRD §4.3, §13). Return only identity fields;
do not duplicate documents, address, registration, or verification data.

### 4.4 Jamaah history record

Reuse the `AttendanceRecord` shape from `docs/api-contract-attendance.md` §3:

```json
{
  "id": "history-101-1001",
  "eventId": 101,
  "eventName": "Kajian Haji Mandiri Sesi 1",
  "eventDate": "2026-01-11",
  "checkInTime": "08:02",
  "status": "hadir"
}
```

| Field         | Rules                                                                   |
| ------------- | ----------------------------------------------------------------------- |
| `id`          | Stable unique row id.                                                    |
| `eventId`     | Event id.                                                               |
| `eventName`   | Display name.                                                           |
| `eventDate`   | `YYYY-MM-DD`.                                                           |
| `checkInTime` | `HH:mm` WIB or `null`; same rule as §4.2.                               |
| `status`      | `hadir` or `absen`.                                                     |

`location` and `zone` may be added and are tolerated by the normalizer, but the UI currently shows
only No, Kegiatan, Tanggal, Waktu Absen, and Status.

---

## 5. Endpoint — `get_attendance_recap`

Returns completed events (recap list) plus global stats and derived filter options.

### 5.1 Request body

```json
{
  "action": "get_attendance_recap",
  "page": 1,
  "per_page": 10,
  "search": "",
  "month": "all",
  "year": "all",
  "zone": "all"
}
```

| Field      | Type      | Required | Default | Notes                                                                                     |
| ---------- | --------- | -------- | ------- | ----------------------------------------------------------------------------------------- |
| `action`   | `string`  | yes      | —       | Literal `"get_attendance_recap"`.                                                         |
| `page`     | `integer` | no       | `1`     | 1-based. Clamp to the last page when it exceeds `totalPages`.                             |
| `per_page` | `integer` | no       | `10`    | Maximum `100`.                                                                            |
| `search`   | `string`  | no       | `""`    | Case-insensitive contains on event name (location is also accepted by the frontend helper). |
| `month`    | `string`  | no       | `"all"` | `"all"` or `"01"`–`"12"`.                                                                 |
| `year`     | `string`  | no       | `"all"` | `"all"` or `"YYYY"` (e.g. `"2026"`).                                                      |
| `zone`     | `string`  | no       | `"all"` | **Admin only.** `"all"` or `"A"`–`"F"`. Ignored for leader (§3.2).                        |

There is no `status` parameter: only `selesai` events are included (PRD §5.2).

### 5.2 Success response

```json
{
  "status": "success",
  "message": "Rekap kehadiran berhasil diambil.",
  "data": {
    "stats": {
      "totalEvents": 10,
      "totalPresent": 34,
      "totalAbsent": 16,
      "percentage": 68
    },
    "events": [
      {
        "eventId": 110,
        "eventName": "Evaluasi Kesiapan Jamaah",
        "eventDate": "2026-02-12",
        "timeStart": "2026-02-12 08:00:00",
        "timeEnd": "2026-02-12 11:00:00",
        "location": "Gedung Serbaguna Telukjambe",
        "zone": "D",
        "status": "selesai",
        "totalPresent": 3,
        "totalAbsent": 2,
        "totalParticipants": 5,
        "percentage": 60
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 10,
      "totalPages": 1,
      "from": 1,
      "to": 10,
      "hasNextPage": false,
      "hasPreviousPage": false
    },
    "scope": {
      "role": "admin",
      "zone": null,
      "isZoneLocked": false
    },
    "filters": {
      "months": [
        { "value": "all", "label": "Semua Bulan" },
        { "value": "02", "label": "Februari" },
        { "value": "01", "label": "Januari" }
      ],
      "years": [
        { "value": "all", "label": "Semua Tahun" },
        { "value": "2026", "label": "2026" }
      ],
      "zones": [
        { "value": "all", "label": "Semua Zona" },
        { "value": "A", "label": "Zona A" },
        { "value": "B", "label": "Zona B" },
        { "value": "C", "label": "Zona C" },
        { "value": "D", "label": "Zona D" },
        { "value": "E", "label": "Zona E" },
        { "value": "F", "label": "Zona F" }
      ]
    }
  }
}
```

| Field        | Rules                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `stats`      | Computed from **all completed events in scope**, ignoring `search`, `month`, `year`, and `zone`. Never shrink with filters. |
| `events`     | The current page, already filtered and sorted newest `eventDate` first.                                                   |
| `pagination` | Applies to `events` only. Keys are camelCase because the hook consumes them directly.                                     |
| `scope`      | Echo of the caller's resolved scope. `zone` is `null` for admin.                                                           |
| `filters`    | Display-ready Indonesian options derived from the **complete scoped dataset**, ignoring active filters, so the dropdown never loses choices. |

Stats formula:

```
percentage = round(totalPresent / (totalPresent + totalAbsent) * 100)  // 0 when denominator is 0
```

`filters.months` must be de-duplicated across years (a month appears once even if it has events in
two years). `filters.zones` only contains zones that have completed events in scope.

### 5.3 Failure cases

- Invalid/expired session, wrong role → §2.3.
- Leader without a zone → zone message, never an empty success.
- Any query error → `status: "error"` with an Indonesian message.

There is no individual event failure here: unknown filters simply return an empty `events` array
with `pagination.total = 0`. The `stats` and `filters` blocks are still scoped and valid.

---

## 6. Endpoint — `get_event_attendance_detail`

Returns one completed event, its participant stats, and the participant list.

### 6.1 Request body

```json
{
  "action": "get_event_attendance_detail",
  "event_id": 101,
  "page": 1,
  "per_page": 10,
  "search": "",
  "status": "all",
  "zone": "all"
}
```

| Field      | Type      | Required | Default | Notes                                                                                       |
| ---------- | --------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| `action`   | `string`  | yes      | —       | Literal `"get_event_attendance_detail"`.                                                    |
| `event_id` | `integer` | yes      | —       | Event id from the recap row.                                                                |
| `page`     | `integer` | no       | `1`     | 1-based.                                                                                    |
| `per_page` | `integer` | no       | `10`    | Maximum `100`.                                                                              |
| `search`   | `string`  | no       | `""`    | Case-insensitive contains on participant `fullName` (region name also accepted by client).   |
| `status`   | `string`  | no       | `"all"` | `"all"` \| `"hadir"` \| `"absen"`.                                                          |
| `zone`     | `string`  | no       | `"all"` | **Admin only.** `"all"` or `"A"`–`"F"`. Ignored for leader.                                 |

### 6.2 Success response

```json
{
  "status": "success",
  "message": "Detail kehadiran kegiatan berhasil diambil.",
  "data": {
    "event": {
      "eventId": 101,
      "eventName": "Kajian Haji Mandiri Sesi 1",
      "eventDate": "2026-01-11",
      "timeStart": "2026-01-11 08:00:00",
      "timeEnd": "2026-01-11 11:00:00",
      "location": "Gedung Dakwah Karawang Barat",
      "zone": "A",
      "status": "selesai"
    },
    "stats": {
      "totalParticipants": 5,
      "totalPresent": 3,
      "totalAbsent": 2,
      "percentage": 60
    },
    "participants": [
      {
        "userId": 1001,
        "fullName": "Ahmad Fauzi",
        "regionId": 11,
        "regionName": "Wilayah A",
        "zone": "A",
        "checkInTime": "08:02",
        "status": "hadir"
      },
      {
        "userId": 1002,
        "fullName": "Siti Aminah",
        "regionId": 11,
        "regionName": "Wilayah A",
        "zone": "A",
        "checkInTime": null,
        "status": "absen"
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 5,
      "totalPages": 1,
      "from": 1,
      "to": 5,
      "hasNextPage": false,
      "hasPreviousPage": false
    }
  }
}
```

| Field          | Rules                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `event`        | Same shape as a recap event row (§4.1). Must be a completed event.                                                                   |
| `stats`        | Computed from the **whole scoped participant list**, ignoring `search`, `status`, and admin `zone` filters. Leader = zone subset only. |
| `participants` | Current page after filters. Keep a stable server-side order; the client does not re-sort.                                             |
| `pagination`   | Applies to `participants` only.                                                                                                      |

Leader rules:

- The event must belong to the leader's zone (or be an all-zone event the backend can scope).
- `stats` must count only jamaah in the leader's zone. Do not return the event-wide total.
- A manipulated `event_id` outside the zone returns `status: "failed"`, never an empty success.

---

## 7. Endpoint — `get_jamaah_attendance_history`

Returns one jamaah's identity, all-time stats, and their event history.

### 7.1 Request body

```json
{
  "action": "get_jamaah_attendance_history",
  "user_id": 1001,
  "page": 1,
  "per_page": 10,
  "search": "",
  "month": "all",
  "status": "all"
}
```

| Field      | Type      | Required | Default | Notes                                                                                     |
| ---------- | --------- | -------- | ------- | ----------------------------------------------------------------------------------------- |
| `action`   | `string`  | yes      | —       | Literal `"get_jamaah_attendance_history"`.                                                |
| `user_id`  | `integer` | yes      | —       | Jamaah id from the participant row. Required for admin and leader; the caller's session is not used as an implicit target. |
| `page`     | `integer` | no       | `1`     | 1-based.                                                                                  |
| `per_page` | `integer` | no       | `10`    | Maximum `100`.                                                                            |
| `search`   | `string`  | no       | `""`    | Case-insensitive contains on event name. Added for the Step 5 search input.                |
| `month`    | `string`  | no       | `"all"` | `"all"` or `"01"`–`"12"`.                                                                 |
| `status`   | `string`  | no       | `"all"` | `"all"` \| `"hadir"` \| `"absen"`.                                                        |

### 7.2 Success response

```json
{
  "status": "success",
  "message": "Riwayat kehadiran jamaah berhasil diambil.",
  "data": {
    "jamaah": {
      "userId": 1006,
      "fullName": "Budi Santoso",
      "zone": "B",
      "regionName": "Wilayah B",
      "batch": "Kloter 02",
      "portionNumber": "B-001"
    },
    "stats": {
      "totalPresent": 1,
      "totalAbsent": 1,
      "totalRecords": 2,
      "percentage": 50,
      "minimumPercentage": 75,
      "isEligible": false
    },
    "records": [
      {
        "id": "history-108-1006",
        "eventId": 108,
        "eventName": "Manasik Haji Lanjutan",
        "eventDate": "2026-02-05",
        "checkInTime": "07:32",
        "status": "hadir"
      },
      {
        "id": "history-102-1006",
        "eventId": 102,
        "eventName": "Bimbingan Manasik Haji Akbar",
        "eventDate": "2026-01-15",
        "checkInTime": null,
        "status": "absen"
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 2,
      "totalPages": 1,
      "from": 1,
      "to": 2,
      "hasNextPage": false,
      "hasPreviousPage": false
    },
    "filters": {
      "months": [
        { "value": "all", "label": "Semua Bulan" },
        { "value": "02", "label": "Februari" },
        { "value": "01", "label": "Januari" }
      ]
    }
  }
}
```

| Field        | Rules                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `jamaah`     | Identity only (§4.3). No documents, address, or profile duplication.                                               |
| `stats`      | All-time, computed from **all** history rows in scope, ignoring `search`, `month`, and `status`. Required keys: `totalPresent`, `totalAbsent`, `totalRecords`, `percentage`. `minimumPercentage` / `isEligible` are optional parity fields. |
| `records`    | Current page after filters, newest `eventDate` first.                                                              |
| `pagination` | Applies to `records` only.                                                                                          |
| `filters`    | Display-ready Indonesian options derived from the **complete scoped history**, ignoring active filters, so a month never disappears after being selected. `months` is required. |

> The Jamaah History UI renders exactly two derived stat cards, `Hadir`
> (`totalPresent`) and `Absen` (`totalAbsent`). There is no "Tingkat Disiplin"
> card; `percentage`, `minimumPercentage`, and `isEligible` stay in the payload
> for contract parity but are not displayed on this page.

Leader rules:

- Admin can request any jamaah.
- Leader can request only a jamaah whose **current** zone matches the leader's zone (the page is
  about the person, so the current zone is the right access check; historical rows still display
  the snapshot zone for past events).
- A jamaah outside the leader's zone returns `status: "failed"` with the out-of-zone message,
  never an empty success.
- An unknown `user_id` returns the "Data jamaah tidak ditemukan." failure.

---

## 8. Business rules the backend must honour

### 8.1 Completed events only (PRD §5.2)

`get_attendance_recap` and both detail/history actions must exclude events with status `live` or
`mendatang`. A live event that already has scans is still excluded until it is marked `selesai`.

### 8.2 Absent rows must exist as data (PRD §5.3, §6.2)

The legacy `attendances` table only stores successful scans, so absence cannot be derived from it
alone. Return one row per (jamaah, completed event in scope), with `checkInTime: null` and
`status: "absen"` when there is no scan. Two acceptable implementations:

1. Materialize `event_attendance_records` (PRD §6.1) and read it.
2. Derive at query time: `completed events × jamaah in scope` left-joined to `attendances`.

Jamaah who register **after** an event completed must still receive an absent row for that event.
Do not filter them out by `users.created_at`.

### 8.3 Region is historical (PRD §5.4)

`region_id` / `zone` on an attendance row is the region **at attendance time**. If a jamaah moves
to another zone, old rows must not be rewritten. Leader scoping for event participants must use
that snapshot, not the current user row. (The jamaah access check in §7 uses the current zone
because the page is about the person; keep the two concepts separate.)

### 8.4 One row per jamaah per event (PRD §5.6)

Enforce `UNIQUE (user_id, event_id)` on the attendance records. Duplicate rows would double-count
stats and produce duplicate React keys.

### 8.5 Stats ignore filters

This is the single most important rule for UI consistency:

- Recap `stats` covers all completed events in scope, not the filtered page.
- Event detail `stats` covers the whole scoped participant list, not the filtered page.
- Jamaah history `stats` is all-time, not the filtered month/status page.

Filter options (`filters`) follow the same rule: derive them from the complete scoped dataset so a
month/year/zone choice does not disappear after the user selects another filter.

### 8.6 Percentage rounding

Use the same formula everywhere:

```
percentage = total === 0 ? 0 : Math.round(present / total * 100)
total = totalPresent + totalAbsent
```

Do not floor, use one decimal, or compute per-page percentages. The stat cards and table rows must
agree.

### 8.7 Timezone and date formats

- `eventDate` / `date`: `YYYY-MM-DD`.
- `timeStart` / `timeEnd`: `YYYY-MM-DD HH:mm:ss`.
- `checkInTime` / `waktu_absen`: already converted to `Asia/Jakarta` (WIB), formatted `HH:mm`.
  The frontend performs no timezone conversion — it only splits the string and appends `WIB`.

### 8.8 Pagination and ordering

- `page` is 1-based; `per_page` defaults to 10 and is capped at 100.
- Clamp `page` to the last page when it is too large.
- Sort recap events and jamaah history rows by `eventDate` descending (newest first). Ties may keep
  any stable order.
- Keep a stable participant order of your choice so the list does not reshuffle between pages.
- Pagination never affects `stats` or `filters`.

### 8.9 Search

- Case-insensitive contains, trimmed.
- Recap: event name; matching location is also acceptable.
- Event detail: participant full name; matching region name is also acceptable.
- Jamaah history: event name.

---

## 9. Frontend consumption map

Step 2 ships helpers, mocks, and hooks. Step 6 adds the API functions. The hooks already normalise
payloads with the helpers in `src/utils/helpers/attendanceRecap.js`, so Phase 3 only swaps the
transport call.

| Action                          | API function (Step 6)                | File                             | Hook                            | Page (Step 3–5)                       | Mock today                        |
| ------------------------------- | ------------------------------------ | -------------------------------- | ------------------------------- | ------------------------------------- | --------------------------------- |
| `get_attendance_recap`          | `getAttendanceRecapAPI`              | `src/utils/admin/api.js`         | `useAttendanceRecap`            | `AttendanceRecapPage`                 | `getAttendanceRecapMock`          |
| `get_event_attendance_detail`   | `getEventAttendanceDetailAPI`        | `src/utils/admin/api.js`         | `useEventAttendanceDetail`      | `EventAttendanceDetailPage`           | `getEventAttendanceDetailMock`    |
| `get_jamaah_attendance_history` | `getJamaahAttendanceHistoryAPI`      | `src/utils/admin/api.js`         | `useJamaahAttendanceHistory`    | `JamaahAttendanceHistoryPage`         | `getJamaahAttendanceHistoryMock`  |
| same three                      | same names                           | `src/utils/leader/api.js`        | same hooks                      | same pages                            | same mocks                        |

### 9.1 Request construction

- Admin sends `zone` only when the user chose a specific zone; `"all"` may be omitted.
- Leader never sends `zone`. It also never sends its zone implicitly; the backend derives it from
  the session. The existing leader client's habit of appending `leader_id` / `zone` to every call
  does **not** apply to these three actions.
- Hooks pass `perPage`; the API function maps it to `per_page`. `search`, `month`, `year`, `status`,
  and `zone` are passed through.
- `scope` from `resolveAttendanceScope(user)` is used by the mock for scoping; the real API function
  does not need to send it. Each role already has its own PHP file.

### 9.2 Hook return shapes

```js
useAttendanceRecap({ scope, search, month, year, zone, page, perPage })
// -> { events, stats, filterOptions, pagination, isLoading, error, refetch }

useEventAttendanceDetail({ scope, eventId, search, status, zone, page, perPage })
// -> { event, participants, stats, pagination, isLoading, error, refetch }

useJamaahAttendanceHistory({ scope, userId, search, month, status, page, perPage })
// -> { jamaah, records, stats, filterOptions, pagination, isLoading, error, refetch }
```

The hooks set `error` to the Indonesian `message` from a `status: "failed"` response, and to
`error.message` for network/non-2xx failures. Retry is `refetch()`. `isBlocked` (leader without a
zone) produces the zone message without calling the API.

---

## 10. Backend acceptance checklist

- [ ] `POST admin.php` / `leader.php` with the three actions returns HTTP 200 and the §2.1 envelope.
- [ ] All application failures are HTTP 200 with `status: "failed" | "error"` and an Indonesian
      `message`.
- [ ] The caller is resolved from the PHP session; `user_id` / `zone` in the body cannot change the
      authenticated identity or widen the scope.
- [ ] `withCredentials: true` is present on the admin and leader axios clients before integration.
- [ ] `get_attendance_recap` returns only `selesai` events, newest first, with scoped stats and
      filter options.
- [ ] `get_event_attendance_detail` returns only completed events; a non-completed or out-of-zone
      `event_id` returns `status: "failed"`.
- [ ] Leader event-detail stats are the leader's zone subset, not event-wide totals.
- [ ] `get_jamaah_attendance_history` returns identity + all-time stats + history rows; an
      out-of-zone `user_id` returns `status: "failed"`.
- [ ] `stats` and `filters` ignore active search/month/year/status/zone filters.
- [ ] `checkInTime` is `HH:mm` WIB or `null`; `eventDate` is `YYYY-MM-DD`.
- [ ] Participant region is the historical snapshot (`region_id` / `zone` at attendance time).
- [ ] Absent rows exist for non-scanners, including jamaah registered after the event completed.
- [ ] `UNIQUE (user_id, event_id)` prevents duplicate attendance rows.
- [ ] `percentage` uses the shared rounding formula and agrees between cards and rows.
- [ ] Pagination is 1-based, defaults to 10/page, caps at 100, and never shrinks `stats`.

---

## 11. Decisions recorded for this iteration

1. **No date-range picker.** The recap uses derived `Bulan` + `Tahun` selects, matching Phase 1.
2. **No event-status filter.** Only completed events exist in the recap, so the UI shows a static
   "Selesai (n)" chip instead of a select.
3. **Admin zone filter affects the recap/participant list only.** Event-wide stats stay event-wide;
   the leader's stats are already zone-scoped by the backend.
4. **No export / print / QR-scanner actions.** They are outside the PRD scope (§13).
5. **Jamaah History is a detail page, not a new Congregation Data menu.** The entry link from the
   existing Congregation Data page is deferred; only Event Details links into it for now.
6. **Congregant history access uses the jamaah's current zone; historical row display uses the
   snapshot zone.** The two must not be conflated.
7. **Jamaah History shows two stat cards only.** `Hadir` and `Absen`; the "Tingkat Disiplin"
   card from the mockup is intentionally omitted. `percentage` and related fields stay in
   `stats` for contract parity but are not rendered.
