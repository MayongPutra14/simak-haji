export default function formatWaktuIndonesia(dateString) {
  if (!dateString) return 'Waktu belum ditentukan';

  const dateObj = new Date(dateString.replace(' ', 'T'));
  if (isNaN(dateObj)) return dateString;

  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(dateObj);
}
