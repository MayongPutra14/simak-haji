/**
 * Change format to Indonesia date
 * Example: '2026-08-25' become 'Selasa, 25 Agustus 2026'
 */
export function formatDateIndonesia(dateString) {
  if (!dateString) return null;
  const dateObj = new Date(dateString.replace(' ', 'T'));
  if (isNaN(dateObj)) return dateString;

  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
}

export function formatTimeIndonesia(dateString) {
  if (!dateString) return null;
  const dateObj = new Date(dateString.replace(' ', 'T'));
  if (isNaN(dateObj)) return dateString;

  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(dateObj);
}

/**
 * Calculate age based on birth date. Menghitung usia akurat berdasarkan tanggal lahir
 * @param {string} birthDay - Format: 'YYYY-MM-DD'
 * @returns {number} age in a year
 */

export const hitungUmur = (birthDay) => {
  if (!birthDay) return 0;

  const currentDay = new Date();
  const birtDate = new Date(birthDay);

  let umur = currentDay.getFullYear() - birtDate.getFullYear();
  const monthDifference = currentDay.getMonth() - birtDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDay.getDate() < birtDate.getDate())
  ) {
    umur--;
  }

  return umur;
};

/**
 * Short Indonesian date for compact tables/cards
 * Example: '2026-01-11' become '11 Jan 2026'
 */
export function formatShortDate(dateString) {
  if (!dateString) return '-';

  const dateObj = new Date(String(dateString).replace(' ', 'T'));
  if (Number.isNaN(dateObj.getTime())) return dateString;

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(dateObj);
}

/**
 * Format a stored attendance time for display
 * Example: '08:05' or '08:05:00' become '08.05 WIB'; empty value becomes '-'
 */
export function formatCheckInTime(timeString) {
  if (!timeString) return '-';

  const [hours, minutes] = String(timeString).split(':');
  if (!hours || !minutes) return String(timeString);

  return `${hours}.${minutes} WIB`;
}

/**
 * PARSE DATETIME FROM BACKEND FOR FORM INPUTS
 * Parses string format "YYYY-MM-DD HH:mm:ss" into split date and time values.
 */
export function parseDateTimeForInput(dateTimeString) {
  if (!dateTimeString) {
    return { date: '', time: '' };
  }

  const [datePart = '', timePart = ''] = dateTimeString.split(' ');
  const formattedTime = timePart ? timePart.slice(0, 5) : '';

  return {
    date: datePart,
    time: formattedTime,
  };
}
