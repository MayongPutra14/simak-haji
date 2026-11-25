import { ATTENDANCE_ALL_VALUE, ATTENDANCE_MIN_PERCENTAGE } from './constant';
import {
  getAttendanceDateParts,
  getAttendanceFilterOptions,
  isPresent,
  normalizeAttendanceRecord,
  normalizeAttendanceStatus,
  normalizeCheckInTime,
  normalizeEventDate,
  sortAttendanceRecords,
} from './attendance';

// SHARED PAGE SIZE: 10 ROWS PER PAGE (PHASE 2 DECISION)
export const ATTENDANCE_RECAP_PAGE_SIZE = 10;

export const ATTENDANCE_ZONE_NOT_SET_MESSAGE =
  'Zona belum ditetapkan. Silakan hubungi admin.';

export const PERCENTAGE_TONE = Object.freeze({
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
});

const pickFirstValue = (...values) =>
  values.find((value) => value !== undefined && value !== null);

const normalizeText = (value) => String(value ?? '').trim();

const normalizeQuery = (value) => normalizeText(value).toLowerCase();

const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined || value === '') return fallback;

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const toCount = (value, fallback = 0) =>
  Math.max(0, Math.round(toNumber(value, fallback)));

const calculatePercentage = (present, absent) => {
  const total = present + absent;

  return total === 0 ? 0 : Math.round((present / total) * 100);
};

/**
 * Zone values arrive as 'A' from the API but can also be labelled ('Zona A',
 * 'Wilayah A') in mock/legacy payloads. Anything else is kept uppercased.
 */
export const normalizeZone = (value) => {
  const text = normalizeText(value);
  if (!text) return null;

  const labelled = text.match(/(?:ZONA|WILAYAH|REGION)\s+([A-Z0-9]+)$/i);
  if (labelled) return labelled[1].toUpperCase();

  return text.toUpperCase();
};

/**
 * Resolve the data scope for admin/leader attendance pages.
 *
 * Leaders are locked to their own zone; a leader without a zone is blocked so
 * the UI never falls back to all-zone data (PRD 2.2, 5.5).
 *
 * @param {object|null|undefined} user - session user from `useAuth()`
 * @returns {{role: string, zone: string|null, isZoneLocked: boolean, isBlocked: boolean}}
 */
export const resolveAttendanceScope = (user) => {
  const role = normalizeText(user?.role).toLowerCase();
  const zone = normalizeZone(
    user?.zone ?? user?.zone_leader ?? user?.zoneLeader,
  );
  const isZoneLocked = role === 'leader';

  return {
    role,
    zone,
    isZoneLocked,
    isBlocked: isZoneLocked && !zone,
  };
};

/**
 * Home route fallback for the attendance feature. Kept local on purpose:
 * the shared `getHomeRoute` helper does not know the leader role yet.
 */
export const getAttendanceHomeRoute = (role) => {
  const normalizedRole = normalizeText(role).toLowerCase();

  if (normalizedRole === 'admin') return '/admin/home';
  if (normalizedRole === 'leader') return '/leader/home';

  return '/';
};

/**
 * Only completed events belong in the recap (PRD 5.2). The API status is
 * 'selesai'; 'completed' and a boolean flag are tolerated as aliases.
 */
export const isCompletedEvent = (event) => {
  const status = normalizeText(event?.status).toLowerCase();

  return (
    status === 'selesai' ||
    status === 'completed' ||
    event?.isCompleted === true ||
    event?.isCompleted === 1
  );
};

const getRowZone = (row) =>
  normalizeZone(
    pickFirstValue(
      row?.zone,
      row?.region_zone,
      row?.regionZone,
      row?.zone_leader,
      row?.eventZone,
      row?.event_zone,
    ),
  );

/**
 * Defensive client-side scope filter. Rows that explicitly belong to another
 * zone are removed; rows without a zone are kept because the backend is
 * responsible for scoping open/all-zone data (docs/api-contract-admin-leader-
 * attendance.md 5).
 */
export const applyAttendanceScope = (rows, scope) => {
  const list = Array.isArray(rows) ? rows : [];

  if (!scope?.isZoneLocked) return list;
  if (scope?.isBlocked) return [];

  const zone = normalizeZone(scope?.zone);
  if (!zone) return [];

  return list.filter((row) => {
    const rowZone = getRowZone(row);

    return !rowZone || rowZone === zone;
  });
};

const resolveEventDate = (event) => {
  const explicitDate = normalizeEventDate(
    pickFirstValue(
      event?.eventDate,
      event?.event_date,
      event?.event_tanggal,
      event?.date,
      event?.tanggal,
    ),
  );

  if (explicitDate) return explicitDate;

  return normalizeEventDate(
    pickFirstValue(event?.timeStart, event?.time_start, event?.start_time),
  );
};

const resolvePercentage = (value, present, absent, fallback = 0) => {
  const percentage = toNumber(value, Number.NaN);

  if (Number.isFinite(percentage)) {
    return Math.min(100, Math.max(0, Math.round(percentage)));
  }

  if (present + absent > 0) return calculatePercentage(present, absent);

  return fallback;
};

/**
 * Map one recap event row into the UI shape used by the recap table/cards.
 * Accepts the real event payload (`eventName`, `date`, `timeStart`, `timeEnd`,
 * `location`, `zone`, `status`) and snake_case aliases.
 */
export const normalizeRecapEvent = (event = {}, index = 0) => {
  const eventId = pickFirstValue(event.eventId, event.event_id, event.id, '');
  const id = eventId === '' ? `event-${index}` : eventId;

  const totalPresent = toCount(
    pickFirstValue(
      event.totalPresent,
      event.total_present,
      event.present,
      event.hadir,
    ),
  );
  const totalAbsent = toCount(
    pickFirstValue(
      event.totalAbsent,
      event.total_absent,
      event.absent,
      event.absen,
    ),
  );
  const totalParticipants = toCount(
    pickFirstValue(
      event.totalParticipants,
      event.total_participants,
      event.total_jamaah,
    ),
    totalPresent + totalAbsent,
  );

  return {
    id,
    eventId,
    eventName: pickFirstValue(
      event.eventName,
      event.event_name,
      event.event_nama,
      event.nama_event,
      event.name,
      '',
    ),
    eventDate: resolveEventDate(event),
    timeStart: pickFirstValue(event.timeStart, event.time_start, ''),
    timeEnd: pickFirstValue(event.timeEnd, event.time_end, ''),
    location: pickFirstValue(
      event.location,
      event.lokasi,
      event.tempat,
      event.place,
      '',
    ),
    zone: normalizeZone(
      pickFirstValue(
        event.zone,
        event.zona,
        event.region_zone,
        event.regionZone,
      ),
    ),
    status: normalizeText(
      pickFirstValue(event.status, event.event_status),
    ).toLowerCase(),
    isCompleted: isCompletedEvent(event),
    totalPresent,
    totalAbsent,
    totalParticipants,
    percentage: resolvePercentage(
      pickFirstValue(event.percentage, event.persentase),
      totalPresent,
      totalAbsent,
    ),
  };
};

export const normalizeRecapEvents = (events) =>
  (Array.isArray(events) ? events : [])
    .filter((event) => event && typeof event === 'object')
    .map((event, index) => normalizeRecapEvent(event, index));

/**
 * Map one event participant row into the UI shape.
 * `zone` / `regionName` are the historical snapshot taken when attendance was
 * recorded (PRD 5.4), never the congregant's current zone.
 */
export const normalizeParticipant = (participant = {}, index = 0) => {
  const checkInTime = normalizeCheckInTime(
    pickFirstValue(
      participant.checkInTime,
      participant.check_in_time,
      participant.waktu_absen,
      participant.attendance_time,
    ),
  );
  const userId = pickFirstValue(
    participant.userId,
    participant.user_id,
    participant.id,
    '',
  );

  return {
    id: userId === '' ? `participant-${index}` : userId,
    userId,
    fullName: pickFirstValue(
      participant.fullName,
      participant.full_name,
      participant.nama,
      participant.name,
      participant.user_name,
      participant.username,
      '',
    ),
    zone: normalizeZone(
      pickFirstValue(
        participant.zone,
        participant.zona,
        participant.region_zone,
        participant.regionZone,
      ),
    ),
    regionId: pickFirstValue(
      participant.regionId,
      participant.region_id,
      participant.id_region,
      '',
    ),
    regionName: pickFirstValue(
      participant.regionName,
      participant.region_name,
      participant.wilayah,
      participant.region,
      '',
    ),
    checkInTime,
    status: normalizeAttendanceStatus(
      pickFirstValue(
        participant.status,
        participant.kehadiran,
        participant.attendance_status,
      ),
      checkInTime,
    ),
  };
};

export const normalizeParticipants = (participants) =>
  (Array.isArray(participants) ? participants : [])
    .filter((participant) => participant && typeof participant === 'object')
    .map((participant, index) => normalizeParticipant(participant, index));

export const normalizeJamaahIdentity = (jamaah = {}) => {
  const userId = pickFirstValue(jamaah.userId, jamaah.user_id, jamaah.id, '');

  return {
    id: userId === '' ? '' : userId,
    userId,
    fullName: pickFirstValue(
      jamaah.fullName,
      jamaah.full_name,
      jamaah.nama,
      jamaah.name,
      '',
    ),
    zone: normalizeZone(
      pickFirstValue(jamaah.zone, jamaah.zona, jamaah.zone_leader),
    ),
    regionName: pickFirstValue(
      jamaah.regionName,
      jamaah.region_name,
      jamaah.wilayah,
      jamaah.region,
      '',
    ),
    batch: pickFirstValue(jamaah.batch, jamaah.kloter, ''),
    portionNumber: pickFirstValue(
      jamaah.portionNumber,
      jamaah.portion_number,
      jamaah.no_porsi,
      jamaah.nomor_porsi,
      '',
    ),
  };
};

/**
 * Jamaah history rows reuse the `AttendanceRecord` shape from Phase 1 and add
 * the event location/zone as extra display data.
 */
export const normalizeJamaahHistoryRecord = (record = {}, index = 0) => {
  const attendanceRecord = normalizeAttendanceRecord(record, index);

  return {
    ...attendanceRecord,
    location: pickFirstValue(record.location, record.lokasi, '', ''),
    zone: normalizeZone(
      pickFirstValue(
        record.zone,
        record.event_zone,
        record.region_zone,
        record.regionZone,
      ),
    ),
  };
};

export const normalizeJamaahHistoryRecords = (records) =>
  (Array.isArray(records) ? records : [])
    .filter((record) => record && typeof record === 'object')
    .map((record, index) => normalizeJamaahHistoryRecord(record, index));

/**
 * Recap stats are calculated from completed events in scope and ignore the
 * active search/month/year filters (PRD 4.1 B).
 */
export const calculateRecapStats = (events = []) => {
  const completedEvents = (Array.isArray(events) ? events : []).filter(
    isCompletedEvent,
  );

  const totalEvents = completedEvents.length;
  const totalPresent = completedEvents.reduce(
    (total, event) => total + toCount(event.totalPresent),
    0,
  );
  const totalAbsent = completedEvents.reduce(
    (total, event) => total + toCount(event.totalAbsent),
    0,
  );

  return {
    totalEvents,
    totalPresent,
    totalAbsent,
    percentage: calculatePercentage(totalPresent, totalAbsent),
  };
};

/**
 * Participant stats are calculated for the whole scoped participant list and
 * ignore search/status/zone filters (PRD 4.2 B).
 */
export const calculateParticipantStats = (participants = []) => {
  const list = Array.isArray(participants) ? participants : [];
  const totalParticipants = list.length;
  const totalPresent = list.filter(isPresent).length;
  const totalAbsent = totalParticipants - totalPresent;

  return {
    totalParticipants,
    totalPresent,
    totalAbsent,
    percentage: calculatePercentage(totalPresent, totalAbsent),
  };
};

const matchesSearch = (value, query) =>
  normalizeText(value).toLowerCase().includes(query);

export const filterRecapEvents = (
  events = [],
  {
    search = '',
    month = ATTENDANCE_ALL_VALUE,
    year = ATTENDANCE_ALL_VALUE,
    zone = ATTENDANCE_ALL_VALUE,
  } = {},
) => {
  const query = normalizeQuery(search);
  const zoneFilter = normalizeZone(zone === ATTENDANCE_ALL_VALUE ? '' : zone);

  return (Array.isArray(events) ? events : [])
    .filter(isCompletedEvent)
    .filter((event) => {
      const { year: eventYear, month: eventMonth } =
        getAttendanceDateParts(event);

      if (year !== ATTENDANCE_ALL_VALUE && eventYear !== year) return false;
      if (month !== ATTENDANCE_ALL_VALUE && eventMonth !== month) {
        return false;
      }

      if (zoneFilter && normalizeZone(event.zone) !== zoneFilter) {
        return false;
      }

      if (
        query &&
        !matchesSearch(event.eventName, query) &&
        !matchesSearch(event.location, query)
      ) {
        return false;
      }

      return true;
    });
};

export const filterParticipants = (
  participants = [],
  {
    search = '',
    status = ATTENDANCE_ALL_VALUE,
    zone = ATTENDANCE_ALL_VALUE,
  } = {},
) => {
  const query = normalizeQuery(search);
  const zoneFilter = normalizeZone(zone === ATTENDANCE_ALL_VALUE ? '' : zone);

  return (Array.isArray(participants) ? participants : []).filter(
    (participant) => {
      if (status !== ATTENDANCE_ALL_VALUE && participant.status !== status) {
        return false;
      }

      if (zoneFilter && normalizeZone(participant.zone) !== zoneFilter) {
        return false;
      }

      if (
        query &&
        !matchesSearch(participant.fullName, query) &&
        !matchesSearch(participant.regionName, query)
      ) {
        return false;
      }

      return true;
    },
  );
};

export const filterJamaahHistory = (
  records = [],
  {
    search = '',
    month = ATTENDANCE_ALL_VALUE,
    status = ATTENDANCE_ALL_VALUE,
  } = {},
) => {
  const query = normalizeQuery(search);

  return (Array.isArray(records) ? records : []).filter((record) => {
    const { month: recordMonth } = getAttendanceDateParts(record);

    if (month !== ATTENDANCE_ALL_VALUE && recordMonth !== month) {
      return false;
    }

    if (status !== ATTENDANCE_ALL_VALUE && record.status !== status) {
      return false;
    }

    if (query && !matchesSearch(record.eventName, query)) return false;

    return true;
  });
};

/**
 * Month/year/zone dropdown options derived from the scoped data, so we never
 * offer a period or zone with no records (approved Phase 2 decision).
 */
export const getRecapFilterOptions = (events = []) => {
  const completedEvents = sortAttendanceRecords(
    (Array.isArray(events) ? events : []).filter(isCompletedEvent),
  );
  const { months, years } = getAttendanceFilterOptions(completedEvents);
  const zoneValues = [];

  completedEvents.forEach((event) => {
    const zone = normalizeZone(event.zone);

    if (zone && !zoneValues.includes(zone)) zoneValues.push(zone);
  });

  zoneValues.sort();

  return {
    months: months.length
      ? months
      : [{ value: ATTENDANCE_ALL_VALUE, label: 'Semua Bulan' }],
    years: years.length
      ? years
      : [{ value: ATTENDANCE_ALL_VALUE, label: 'Semua Tahun' }],
    zones: [
      { value: ATTENDANCE_ALL_VALUE, label: 'Semua Zona' },
      ...zoneValues.map((zone) => ({ value: zone, label: `Zona ${zone}` })),
    ],
  };
};

/**
 * @returns {{rows: Array, pagination: {page: number, perPage: number,
 *            total: number, totalPages: number, from: number, to: number,
 *            hasNextPage: boolean, hasPreviousPage: boolean}}}
 */
export const paginateRows = (
  rows = [],
  page = 1,
  perPage = ATTENDANCE_RECAP_PAGE_SIZE,
) => {
  const list = Array.isArray(rows) ? rows : [];
  const safePerPage = Math.max(
    1,
    Math.floor(toNumber(perPage, ATTENDANCE_RECAP_PAGE_SIZE)),
  );
  const total = list.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / safePerPage);
  const safePage =
    totalPages === 0
      ? 1
      : Math.min(Math.max(1, Math.floor(toNumber(page, 1))), totalPages);

  const start = (safePage - 1) * safePerPage;
  const end = Math.min(start + safePerPage, total);

  return {
    rows: list.slice(start, end),
    pagination: {
      page: safePage,
      perPage: safePerPage,
      total,
      totalPages,
      from: total === 0 ? 0 : start + 1,
      to: end,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1,
    },
  };
};

/**
 * Initials for avatar fallbacks, e.g. "Ahmad Fauzi" -> "AF".
 */
export const getInitials = (fullName) => {
  const parts = normalizeText(fullName).split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

/**
 * Tone key for percentage bars/badges. The 75% threshold is the Istitha'ah
 * minimum already used by the jamaah page.
 */
export const getPercentageTone = (percentage) => {
  const value = toNumber(percentage, 0);

  if (value >= ATTENDANCE_MIN_PERCENTAGE) return PERCENTAGE_TONE.SUCCESS;
  if (value >= 50) return PERCENTAGE_TONE.WARNING;

  return PERCENTAGE_TONE.DANGER;
};

/**
 * Long Indonesian date used by the recap table/cards, e.g. "11 Januari 2026".
 * The value is already normalized to 'YYYY-MM-DD' by the row normalizers.
 */
export const formatAttendanceRecapDate = (value) => {
  const normalized = normalizeEventDate(value);
  if (!normalized) return '-';

  const date = new Date(`${normalized}T00:00:00`);
  if (Number.isNaN(date.getTime())) return normalized;

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Compact page list for the pagination footer, e.g.
 * [1, 'ellipsis-5', 5, 6, 7, 'ellipsis-8', 10].
 * Strings mark a skipped range; numbers are clickable pages.
 */
export const getPaginationWindow = (page, totalPages, maxVisible = 5) => {
  const total = Math.max(1, Math.floor(toNumber(totalPages, 1)));
  const current = Math.min(Math.max(1, Math.floor(toNumber(page, 1))), total);
  const visible = Math.max(3, Math.floor(toNumber(maxVisible, 5)));

  if (total <= visible) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set([1, total, current, current - 1, current + 1]);

  if (current <= 3) [2, 3, 4].forEach((value) => pages.add(value));
  if (current >= total - 2) {
    [total - 3, total - 2, total - 1].forEach((value) => pages.add(value));
  }

  const sorted = [...pages]
    .filter((value) => value >= 1 && value <= total)
    .sort((first, second) => first - second);

  return sorted.reduce((window, value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) {
      window.push(`ellipsis-${value}`);
    }

    window.push(value);
    return window;
  }, []);
};
