# Admin & Leader Attendance Recap — Backend Implementation Notes

**Status:** Implemented and smoke-tested (Phase 3.1).
**Code:** `controllers/AttendanceRecapService.php`, thin methods in `controllers/AdminController.php` /
`controllers/LeaderController.php`, routing in `api/admin.php` / `api/leader.php`.
**Contract:** `docs/api-contract-admin-leader-attendance.md` (read that for product intent; this file
records what the backend **actually returns**).
**Scope:** Admin & Leader only. Jamaah self-service stays on `api/user.php` → `get_my_attendance`.

---

## 1. Endpoints, session, and actions

### 1.1 Transport

| Item | Admin | Leader |
| --- | --- | --- |
| Method | `POST` | `POST` |
| Dev URL | `http://localhost/simak_api/api/admin.php` | `http://localhost/simak_api/api/leader.php` |
| Prod URL | `https://simak-api.my.id/api/admin.php` | `https://simak-api.my.id/api/leader.php` |
| Body | JSON (`Content-Type: application/json`) | same |
| Auth | PHP session cookie `PHPSESSID` | same |
| Response | `application/json; charset=utf-8` | same |

- The action is read from the JSON body (`body.action`). `?action=` also works but is **not** the
  convention; send it in the body.
- Every action requires a valid `PHPSESSID`. Log in first with `POST /api/login.php`
  (`nomor_porsi` + `password`); Postman's cookie jar stores the cookie automatically.
- Browser clients must use `withCredentials: true` (`src/utils/admin/api.js`,
  `src/utils/leader/api.js`). `admin.php` / `leader.php` now reflect the request `Origin` (with
  `Vary: Origin`) instead of `*`, because `*` + credentials is rejected by browsers.
- Each file is role-locked: `admin.php` requires `users.role = 'admin'`, `leader.php` requires
  `users.role = 'leader'`. Role and zone are re-read from the database on every request.

### 1.2 Actions

| `action` | File | Purpose |
| --- | --- | --- |
| `get_attendance_recap` | both | Completed-event list + global stats + filter options |
| `get_event_attendance_detail` | both | One completed event + participant stats + participant list |
| `get_jamaah_attendance_history` | both | One jamaah identity + all-time stats + event history |

### 1.3 HTTP status semantics

- **All application failures are HTTP 200** with `"status": "failed"` (validation/authorization) or
  `"status": "error"` (query failure) and an Indonesian `message`. Hooks treat both identically.
- `404` is returned only for an unknown `action` (the file's existing default branch), with
  `{"status":"failed","message":"Endpoint tidak ditemukan atau Action salah."}`.
- `500` only for the missing-DB-connection guard in the entrypoint.
- Nothing in these three actions returns `4xx`.

---

## 2. Postman request payloads

All examples are the **JSON body**. Omitted optional fields use the default shown in §2.5.

### 2.1 Login (once, to get the cookie)

```json
{
  "nomor_porsi": "<admin-or-leader-nomor-porsi>",
  "password": "<password>"
}
```

`POST http://localhost/simak_api/api/login.php`. A jamaah login will be rejected by both attendance
files with `Anda tidak memiliki akses ke halaman ini.`

### 2.2 `get_attendance_recap`

Normal request (newest first, 10 per page):

```json
{
  "action": "get_attendance_recap"
}
```

Filters + pagination:

```json
{
  "action": "get_attendance_recap",
  "page": 1,
  "per_page": 10,
  "search": "manasik",
  "month": "11",
  "year": "2026",
  "zone": "A"
}
```

- `zone` is **admin only** (`"all"` or `"A"`–`"F"`). A leader's `zone` is ignored.
- `month` must be `"all"` or `"01"`–`"12"`; `year` must be `"all"` or a 4-digit year. Anything else
  is silently treated as `"all"` (no error).
- There is no `status` parameter: only `status = 'selesai'` events exist in the recap.

### 2.3 `get_event_attendance_detail`

```json
{
  "action": "get_event_attendance_detail",
  "event_id": 26
}
```

With participant filters:

```json
{
  "action": "get_event_attendance_detail",
  "event_id": 26,
  "page": 1,
  "per_page": 25,
  "search": "abdul",
  "status": "absen",
  "zone": "F"
}
```

- `event_id` is required (integer). `status` is `"all"`, `"hadir"`, or `"absen"` (case-insensitive;
  invalid → `"all"`).
- `zone` is **admin only**. A leader's `zone` is ignored.

### 2.4 `get_jamaah_attendance_history`

```json
{
  "action": "get_jamaah_attendance_history",
  "user_id": 117
}
```

With filters:

```json
{
  "action": "get_jamaah_attendance_history",
  "user_id": 117,
  "page": 1,
  "per_page": 10,
  "search": "manasik",
  "month": "11",
  "status": "hadir"
}
```

- `user_id` is required and must be a jamaah (`users.role = 'user'`). It is **only the target**, never
  the caller's identity.
- There is no `zone` parameter. Sending one has no effect for either role.

### 2.5 Defaults and clamps

| Field | Default | Rule |
| --- | --- | --- |
| `page` | `1` | 1-based; values < 1 become 1; values past the last page are clamped to the last page |
| `per_page` | `10` | Values < 1 become 10; capped at `100` |
| `search` | `""` | Trimmed; literal `%` / `_` are escaped; case-insensitive contains |
| `month` | `"all"` | `"all"` or `"01"`–`"12"` |
| `year` | `"all"` | `"all"` or `"YYYY"` |
| `status` | `"all"` | `"all"`, `"hadir"`, `"absen"` |
| `zone` | `"all"` | Admin only, `"A"`–`"F"`; leader always uses the session zone |

### 2.6 Leader security probes (Postman)

Use a leader session for all rows. Replace ids with values from your own recap/detail responses.

| Probe | Body | Expected |
| --- | --- | --- |
| No cookie / expired session | any action | HTTP 200, `failed`, `Sesi login tidak valid, silakan login kembali.` |
| Jamaah session on `admin.php` or `leader.php` | any action | HTTP 200, `failed`, `Anda tidak memiliki akses ke halaman ini.` |
| Leader injects `zone` into recap | `{"action":"get_attendance_recap","zone":"A"}` | success; `data.scope.zone` is the **session** zone, `isZoneLocked: true`; result set unchanged |
| Leader injects `leader_id` | `{"action":"get_attendance_recap","leader_id":1}` | `leader_id` ignored; same result |
| Leader detail for another zone's event | `{"action":"get_event_attendance_detail","event_id":<leader-D-event>}` | `failed`, `Anda tidak memiliki akses ke kegiatan di luar zona Anda.` |
| Leader detail for an all-zone / jamaah event with `zone` | `{"action":"get_event_attendance_detail","event_id":25,"zone":"A"}` | success; stats and participants are the **leader's zone only**; `zone` ignored |
| Leader history for a jamaah in another zone | `{"action":"get_jamaah_attendance_history","user_id":<zone-A-user>}` | `failed`, `Anda tidak memiliki akses ke data jamaah di luar zona Anda.` |
| Leader history for own-zone jamaah + `zone` | `{"action":"get_jamaah_attendance_history","user_id":<own-zone-user>,"zone":"A"}` | success; `zone` ignored |
| Leader history with `user_id` = admin/leader id | `{"action":"get_jamaah_attendance_history","user_id":1}` | `failed`, `Data jamaah tidak ditemukan.` |
| Admin injects `user_id` into recap | `{"action":"get_attendance_recap","user_id":117}` | ignored; normal success |

Local dev fixtures used during smoke testing (may change): admin id `1`, leader id `296` (zone `F`),
jamaah `117` (zone `F`), jamaah `43` (zone `A`), completed events `26` (leader/F), `25`
(jamaah/`umum`), `13` (jamaah/`B`), `19` (leader/D — out of zone for leader F).

---

## 3. Response shapes

### 3.1 Envelope

Success:

```json
{
  "status": "success",
  "message": "Rekap kehadiran berhasil diambil.",
  "data": {}
}
```

Failure:

```json
{
  "status": "failed",
  "message": "Zona belum ditetapkan. Silakan hubungi admin."
}
```

- `data` is present on success only; failures have just `status` + `message`.
- `message` is always present, including success (the UI does not need to render it on success).

### 3.2 `get_attendance_recap` — `data`

```json
{
  "stats": {
    "totalEvents": 15,
    "totalPresent": 2,
    "totalAbsent": 2072,
    "percentage": 0
  },
  "events": [
    {
      "eventId": 26,
      "id": 26,
      "eventName": "Latihan Manasik Haji",
      "eventDate": "2026-11-19",
      "timeStart": "2026-11-19 09:00:00",
      "timeEnd": "2026-11-19 12:00:00",
      "location": "Masjid Agung Samarinda",
      "zone": "F",
      "status": "selesai",
      "totalPresent": 0,
      "totalAbsent": 18,
      "totalParticipants": 18,
      "percentage": 0
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 15,
    "totalPages": 2,
    "from": 1,
    "to": 10,
    "hasNextPage": true,
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
      { "value": "11", "label": "November" },
      { "value": "10", "label": "Oktober" }
    ],
    "years": [
      { "value": "all", "label": "Semua Tahun" },
      { "value": "2026", "label": "2026" }
    ],
    "zones": [
      { "value": "all", "label": "Semua Zona" },
      { "value": "C", "label": "Zona C" },
      { "value": "D", "label": "Zona D" },
      { "value": "F", "label": "Zona F" }
    ]
  }
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `stats.totalEvents` | int | Completed events in scope, **ignoring** all filters |
| `stats.totalPresent` | int | Scans in scope, ignoring filters |
| `stats.totalAbsent` | int | `sum(participants per event) - totalPresent`, ignoring filters |
| `stats.percentage` | int 0–100 | `round(totalPresent / (totalPresent + totalAbsent) * 100)`, `0` when denominator is 0 |
| `events[].eventId` / `events[].id` | int | Same value; `eventId` is the canonical one |
| `events[].eventName` | string | Trimmed |
| `events[].eventDate` | string `YYYY-MM-DD` | Derived from `waktu_event` |
| `events[].timeStart` / `timeEnd` | string `YYYY-MM-DD HH:mm:ss` \| null | Raw DB values |
| `events[].location` | string \| null | `events.tempat` |
| `events[].zone` | string \| null | Raw `events.zona_target`: `"A"`–`"F"`, `"umum"`, or `null`. **Label only, not the participant scope** |
| `events[].status` | string | Always `"selesai"` here |
| `events[].totalPresent` | int | Scans for this event in scope (admin `zone` filter narrows this) |
| `events[].totalAbsent` | int | Scoped jamaah − present for this event |
| `events[].totalParticipants` | int | `totalPresent + totalAbsent` |
| `events[].percentage` | int 0–100 | Same rounding formula |
| `pagination.page` | int | Clamped requested page |
| `pagination.perPage` | int | 1–100 |
| `pagination.total` | int | Filtered event count |
| `pagination.totalPages` | int | Minimum `1`, even when `total = 0` |
| `pagination.from` / `to` | int | `0` when the page is empty |
| `pagination.hasNextPage` / `hasPreviousPage` | bool | — |
| `scope.role` | `"admin"` \| `"leader"` | From the session |
| `scope.zone` | string \| null | `null` for admin; leader's session zone |
| `scope.isZoneLocked` | bool | `true` for leader |
| `filters.months` | array | `{value,label}`, newest first, de-duplicated across years |
| `filters.years` | array | `{value,label}`, newest first |
| `filters.zones` | array | Admin: `all` + zones of `jenis_event = 'leader'` events in scope. **Leader: `[]`** |

### 3.3 `get_event_attendance_detail` — `data`

```json
{
  "event": {
    "eventId": 26,
    "id": 26,
    "eventName": "Latihan Manasik Haji",
    "eventDate": "2026-11-19",
    "timeStart": "2026-11-19 09:00:00",
    "timeEnd": "2026-11-19 12:00:00",
    "location": "Masjid Agung Samarinda",
    "zone": "F",
    "status": "selesai"
  },
  "stats": {
    "totalParticipants": 18,
    "totalPresent": 0,
    "totalAbsent": 18,
    "percentage": 0
  },
  "participants": [
    {
      "userId": 117,
      "fullName": "ABDUL LATIP",
      "regionId": null,
      "regionName": "Wilayah F",
      "zone": "F",
      "checkInTime": null,
      "status": "absen"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 18,
    "totalPages": 2,
    "from": 1,
    "to": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `event.*` | — | Same shape/values as a recap row, minus totals |
| `event.eventDate` | string \| null | `null` only if `waktu_event` is `null` |
| `stats.totalParticipants` | int | Whole scoped participant set (leader = leader zone), ignoring `search`/`status`/admin `zone` |
| `stats.totalPresent` | int | Same scope, scans only |
| `stats.totalAbsent` | int | `totalParticipants - totalPresent` |
| `stats.percentage` | int 0–100 | Same formula |
| `participants[].userId` | int | Link target for `get_jamaah_attendance_history` |
| `participants[].fullName` | string | Trimmed |
| `participants[].regionId` | `null` | Always `null` — no region snapshot column exists (see §4) |
| `participants[].regionName` | string \| null | `"Wilayah X"` from the jamaah's current `users.zona` |
| `participants[].zone` | string \| null | Current `users.zona` |
| `participants[].checkInTime` | string `HH:mm` \| null | WIB; `null` when absent |
| `participants[].status` | `"hadir"` \| `"absen"` | — |
| `pagination` | — | Applies to `participants` only |

Ordering: `fullName ASC, userId ASC` (stable across pages).

### 3.4 `get_jamaah_attendance_history` — `data`

```json
{
  "jamaah": {
    "userId": 117,
    "fullName": "ABDUL LATIP",
    "zone": "F",
    "regionName": "Wilayah F",
    "portionNumber": "1000757536"
  },
  "stats": {
    "totalPresent": 0,
    "totalAbsent": 13,
    "totalRecords": 13,
    "percentage": 0
  },
  "records": [
    {
      "id": "history-26-117",
      "eventId": 26,
      "eventName": "Latihan Manasik Haji",
      "eventDate": "2026-11-19",
      "checkInTime": null,
      "status": "absen"
    }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 13,
    "totalPages": 2,
    "from": 1,
    "to": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "filters": {
    "months": [
      { "value": "all", "label": "Semua Bulan" },
      { "value": "11", "label": "November" }
    ]
  }
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `jamaah.userId` | int | Target jamaah |
| `jamaah.fullName` | string | Trimmed |
| `jamaah.zone` | string \| null | Current zone |
| `jamaah.regionName` | string \| null | `"Wilayah X"` or `null` when the zone is empty |
| `jamaah.portionNumber` | string | `users.nomor_porsi` |
| `jamaah.batch` | — | **Not returned** (optional in the contract; no reliable source used) |
| `stats.totalPresent` / `totalAbsent` / `totalRecords` | int | All-time, ignoring `search`/`month`/`status` |
| `stats.percentage` | int 0–100 | `round(present / totalRecords * 100)` |
| `stats.minimumPercentage` / `isEligible` | — | **Not returned** (optional contract fields) |
| `records[].id` | string | `history-{eventId}-{userId}`, same format for `hadir` and `absen` |
| `records[].eventId` | int | — |
| `records[].eventName` | string | Trimmed |
| `records[].eventDate` | string `YYYY-MM-DD` | — |
| `records[].checkInTime` | string `HH:mm` \| null | WIB; `null` when absent |
| `records[].status` | `"hadir"` \| `"absen"` | — |
| `filters.months` | array | `{value,label}`, newest first |

Ordering: `eventDate DESC`, ties broken by `eventId DESC`.

### 3.5 Failure messages (HTTP 200 unless stated)

| Condition | `status` | `message` |
| --- | --- | --- |
| No session / expired session | `failed` | `Sesi login tidak valid, silakan login kembali.` |
| Session lookup threw | `failed` | `Gagal memvalidasi sesi login. Silakan coba lagi.` |
| Wrong role for this file (jamaah, or admin on `leader.php`) | `failed` | `Anda tidak memiliki akses ke halaman ini.` |
| Leader has no `users.zona` | `failed` | `Zona belum ditetapkan. Silakan hubungi admin.` |
| `event_id` missing / unknown / deleted | `failed` | `Kegiatan tidak ditemukan.` |
| Event is `live` / `mendatang` | `failed` | `Rekap hanya tersedia untuk kegiatan yang telah selesai.` |
| Leader requests another zone's event | `failed` | `Anda tidak memiliki akses ke kegiatan di luar zona Anda.` |
| `user_id` missing / unknown / not a jamaah | `failed` | `Data jamaah tidak ditemukan.` |
| Leader requests another zone's jamaah | `failed` | `Anda tidak memiliki akses ke data jamaah di luar zona Anda.` |
| Query/server failure (recap) | `error` | `Gagal memuat rekap kehadiran.` |
| Query/server failure (detail) | `error` | `Gagal memuat detail kehadiran kegiatan.` |
| Query/server failure (history) | `error` | `Gagal memuat riwayat kehadiran jamaah.` |
| Unknown `action` | `failed` | `Endpoint tidak ditemukan atau Action salah.` — **HTTP 404** |

---

## 4. Intentional nuances (do not "fix" in the frontend)

1. **Absences are derived, not stored.** `attendances` only holds successful scans. A row is absent
   when the `(jamaah, completed event)` pair has no scan. Jamaah who registered after an event still
   count as absent for it (PRD §5.3). No schema change was made.
2. **`regionId` is always `null`; region is the jamaah's current zone.** The schema has no
   `region_id` / zone snapshot on `attendances`, so historical region (contract §4.2 / §8.3) cannot be
   returned yet. `regionName` = `"Wilayah " + users.zona`; `zone` = current `users.zona`.
3. **Event `zone` is a label, not the participant scope.** `zone` is the raw `events.zona_target`
   (`"A"`–`"F"`, `"umum"`, or `null`). A `jenis_event = 'jamaah'` event is open to every jamaah even
   when `zona_target` is a letter; leader totals are already recomputed for the leader's zone.
4. **`stats` never shrink with filters.**
   - Recap: `stats` ignore `search`, `month`, `year`, and admin `zone`.
   - Detail: `stats` ignore `search`, `status`, and admin `zone`.
   - History: `stats` are all-time, ignoring `search`, `month`, `status`.
   `filters` are derived from the same unfiltered set, so a selected option never disappears.
5. **Admin `zone` filter changes the list and row counts, not `stats`.** Recap keeps jamaah/all-zone
   events and matching-zone leader events; each row's `totalPresent`/`totalAbsent` cover that zone
   only. Detail narrows the participant list only.
6. **Admin `zone` on a zone-targeted event with a different zone** returns success with
   `participants: []` and `pagination.total: 0`, while `stats` stay event-wide. This is intentional:
   the event exists, that zone simply has no participants in it.
7. **Leader-supplied `zone` is ignored, never rejected.** `scope.zone` always echoes the session zone,
   so the UI can prove the lock. A leader without a zone gets the zone failure, never all-zone data.
8. **`user_id` is only a target.** It is never used as the caller's identity; the session is. Admins
   may read any jamaah; leaders only jamaah whose **current** zone matches.
9. **`eventDate` / `checkInTime` are already WIB.** The backend sets `SET time_zone = '+07:00'` per
   request and returns `YYYY-MM-DD` / `HH:mm`. The frontend must not re-convert timezones; `"00:00"`
   is never used as an absent placeholder (absent is `null`).
10. **`totalPages` is at least 1**, even when `total = 0`; `from`/`to` are `0` then.
11. **Only `selesai` events exist in the recap.** `syncEventStatuses()` runs at the start of every
    action and promotes past events to `selesai` (this writes to the DB on read; that is expected).
    There is no status filter parameter.
12. **`filters.zones` is `[]` for leaders** (no zone filter in the UI). `filters.months`/`years` are
    display-ready Indonesian labels; `value` is `"all"`, `"01"`–`"12"`, or `"YYYY"`.
13. **`eventName`/`fullName` are trimmed; `location`/`timeEnd` may be `null`.** Do not assume strings
    for those two.
14. **Participant and history order is server-defined** (participants by name, history/recap newest
    first). The client should not re-sort, or pagination will look inconsistent.
