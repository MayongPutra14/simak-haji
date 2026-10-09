/**
 * Change format to Indonesia date
 * Example: '2026-08-25' become 'Selasa, 25 Agustus 2026'
 */
export function formatDateIndonesia(dateString) {
  if (!dateString) return 'Tanggal belum ditentukan';
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
  if (!dateString) return 'Waktu belum ditentukan';
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
 * Change format to Indonesia date
 * Example: '2026-08-25' become '25 Agustus 2026'
 */
export const formatTanggalIndonesia = (date) => {
  if (!date) return '-';
  const opsi = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', opsi);
};

/**
 * PARSE DATETIME FROM BACKEND FOR FORM INPUTS
 * Parses string format "YYYY-MM-DD HH:mm:ss" into split date and time values.
 */
export function parseDateTimeForInput(dateTimeString) {
  if (!dateTimeString) {
    return { eventDate: '', eventTime: '' };
  }

  // split date and time parts
  const [datePart = '', timePart = ''] = dateTimeString.split(' ');

  // extract HH:mm from HH:mm:ss
  const formattedTime = timePart ? timePart.slice(0, 5) : '';

  return {
    eventDate: datePart,
    eventTime: formattedTime,
  };
}
