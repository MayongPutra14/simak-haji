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
