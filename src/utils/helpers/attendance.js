import {
  ATTENDANCE_ALL_VALUE,
  ATTENDANCE_MIN_PERCENTAGE,
  ATTENDANCE_STATUS,
  MONTH_LABELS,
} from './constant';

export const isPresent = (record) =>
  record?.status === ATTENDANCE_STATUS.PRESENT;

/**
 * Split an 'YYYY-MM-DD' value into filterable parts without timezone surprises.
 */
export const getAttendanceDateParts = (record) => {
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
