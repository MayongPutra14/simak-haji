import {
  ATTENDANCE_ALL_VALUE,
  ATTENDANCE_MIN_PERCENTAGE,
  ATTENDANCE_STATUS,
  MONTH_LABELS,
} from './constant';

export const isPresent = (record) =>
  record?.status === ATTENDANCE_STATUS.PRESENT;

const pickFirstValue = (...values) =>
  values.find((value) => value !== undefined && value !== null);

/**
 * Normalize `checkInTime` / `waktu_absen` into 'HH:mm' or null.
 * Empty strings, 'NULL' and MySQL zero timestamps must become null, never '00:00'.
 */
export const normalizeCheckInTime = (value) => {
  if (value === null || value === undefined) return null;

  const text = String(value).trim();
  if (!text || text.toUpperCase() === 'NULL') return null;
  if (text.startsWith('0000-00-00')) return null;

  const match = text.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  return `${match[1].padStart(2, '0')}:${match[2]}`;
};

/**
 * The API status is 'hadir' | 'absen'. English aliases are tolerated, and when the
 * field is missing the status is derived from the check-in time so a scanned row is
 * never displayed as absent.
 */
export const normalizeAttendanceStatus = (status, checkInTime) => {
  const value = String(status ?? '')
    .trim()
    .toLowerCase();

  if (value === ATTENDANCE_STATUS.PRESENT || value === 'present') {
    return ATTENDANCE_STATUS.PRESENT;
  }

  if (value === ATTENDANCE_STATUS.ABSENT || value === 'absent') {
    return ATTENDANCE_STATUS.ABSENT;
  }

  return checkInTime ? ATTENDANCE_STATUS.PRESENT : ATTENDANCE_STATUS.ABSENT;
};

/**
 * Keep the date filterable and sortable as 'YYYY-MM-DD'. A MySQL datetime is
 * truncated to its date part, and 'DD-MM-YYYY' / 'DD/MM/YYYY' are flipped.
 */
export const normalizeEventDate = (value) => {
  if (!value) return '';

  const text = String(value).trim();

  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  const local = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (local) {
    return `${local[3]}-${local[2].padStart(2, '0')}-${local[1].padStart(2, '0')}`;
  }

  return text;
};

/**
 * Map one backend record into the UI shape used by the page and cards.
 *
 * Contract is camelCase (docs/api-contract-attendance.md 2.2); the snake_case keys
 * from 3.1 are also accepted so a database-shaped payload does not blank the page.
 */
export const normalizeAttendanceRecord = (record = {}, index = 0) => {
  const checkInTime = normalizeCheckInTime(
    pickFirstValue(
      record.checkInTime,
      record.check_in_time,
      record.waktu_absen,
    ),
  );

  const eventId = pickFirstValue(record.eventId, record.event_id, '');
  const rawId = pickFirstValue(record.id, record.attendance_id, eventId);
  const id = rawId === '' ? `attendance-${index}` : rawId;

  return {
    id,
    eventId,
    eventName: pickFirstValue(
      record.eventName,
      record.event_name,
      record.event_nama,
      '',
    ),
    eventDate: normalizeEventDate(
      pickFirstValue(record.eventDate, record.event_date, record.event_tanggal),
    ),
    checkInTime,
    status: normalizeAttendanceStatus(
      pickFirstValue(record.status, record.kehadiran),
      checkInTime,
    ),
  };
};

/**
 * Defensive list mapping: the hook must never receive null, because
 * `sortAttendanceRecords` spreads the array.
 */
export const normalizeAttendanceRecords = (records) =>
  (Array.isArray(records) ? records : [])
    .filter((record) => record && typeof record === 'object')
    .map((record, index) => normalizeAttendanceRecord(record, index));

/**
 * Split an 'YYYY-MM-DD' value into filterable parts without timezone surprises.
 */
const getAttendanceDateParts = (record) => {
  const [year = '', month = ''] = String(record?.eventDate ?? '').split('-');

  return { year, month };
};

/**
 * Newest event first. Used by the hook before any filter is applied.
 */
export const sortAttendanceRecords = (records = []) =>
  [...records].sort(
    (first, second) =>
      new Date(second.eventDate ?? 0) - new Date(first.eventDate ?? 0),
  );

/**
 * @returns {{totalPresent: number, totalAbsent: number, totalRecords: number,
 *            percentage: number, minimumPercentage: number, isEligible: boolean}}
 */
export const calculateAttendanceStats = (
  records = [],
  minimumPercentage = ATTENDANCE_MIN_PERCENTAGE,
) => {
  const totalPresent = records.filter(isPresent).length;
  const totalAbsent = records.length - totalPresent;
  const totalRecords = totalPresent + totalAbsent;

  const percentage =
    totalRecords === 0 ? 0 : Math.round((totalPresent / totalRecords) * 100);

  return {
    totalPresent,
    totalAbsent,
    totalRecords,
    percentage,
    minimumPercentage,
    isEligible: totalRecords > 0 && percentage >= minimumPercentage,
  };
};

/**
 * Month/year dropdown options derived from the records (approved Phase 1 decision),
 * so we never offer a period with no data. Order follows the incoming records,
 * which the hook already sorts newest first.
 */
export const getAttendanceFilterOptions = (records = []) => {
  const seenMonths = new Set();
  const seenYears = new Set();
  const monthOptions = [];
  const yearOptions = [];

  records.forEach((record) => {
    const { year, month } = getAttendanceDateParts(record);

    if (year && !seenYears.has(year)) {
      seenYears.add(year);
      yearOptions.push({ value: year, label: year });
    }

    if (month && !seenMonths.has(month)) {
      seenMonths.add(month);
      monthOptions.push({
        value: month,
        label: MONTH_LABELS[Number(month) - 1] ?? month,
      });
    }
  });

  return {
    months: [
      { value: ATTENDANCE_ALL_VALUE, label: 'Semua Bulan' },
      ...monthOptions,
    ],
    years: [
      { value: ATTENDANCE_ALL_VALUE, label: 'Semua Tahun' },
      ...yearOptions,
    ],
  };
};

/**
 * Client-side filtering for Phase 1. Phase 3 moves this to the API (PRD 7.1).
 *
 * @param {Array} records - attendance records in UI shape
 * @param {{month?: string, year?: string, status?: string}} filters
 */
export const filterAttendanceRecords = (
  records = [],
  {
    month = ATTENDANCE_ALL_VALUE,
    year = ATTENDANCE_ALL_VALUE,
    status = ATTENDANCE_ALL_VALUE,
  } = {},
) =>
  records.filter((record) => {
    const parts = getAttendanceDateParts(record);

    if (year !== ATTENDANCE_ALL_VALUE && parts.year !== year) return false;
    if (month !== ATTENDANCE_ALL_VALUE && parts.month !== month) return false;
    if (status !== ATTENDANCE_ALL_VALUE && record.status !== status) {
      return false;
    }

    return true;
  });
