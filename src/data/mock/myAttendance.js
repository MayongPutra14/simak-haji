/**
 * MOCK DATA — PHASE 1 ONLY (JAMAAH "ABSENSI SAYA" PAGE)
 *
 * Temporary source for the congregant attendance recap. Every record follows the
 * UI contract used by the page and the `useMyAttendance` hook:
 *
 * { id, eventId, eventName, eventDate: 'YYYY-MM-DD', checkInTime: 'HH:mm' | null, status: 'hadir' | 'absen' }
 *
 * Totals intentionally match the Stitch mockup: 18 hadir / 4 absen (82%).
 * Two records live in December 2025 so the year filter has a second option.
 *
 * DELETE THIS FILE IN PHASE 3 once `getMyAttendance` is available on the backend.
 * Do not import it from anywhere other than `src/hooks/user/useMyAttendance.js`.
 */
export const MOCK_MY_ATTENDANCE = [
  {
    id: 1,
    eventId: 'evt-001',
    eventName: 'Bimbingan Rohani Akhir Tahun',
    eventDate: '2025-12-14',
    checkInTime: '08:10',
    status: 'hadir',
  },
  {
    id: 2,
    eventId: 'evt-002',
    eventName: 'Kajian Manasik Haji Gelombang I',
    eventDate: '2025-12-21',
    checkInTime: '07:55',
    status: 'hadir',
  },
  {
    id: 3,
    eventId: 'evt-003',
    eventName: 'Kajian Haji Mandiri',
    eventDate: '2026-01-03',
    checkInTime: '08:05',
    status: 'hadir',
  },
  {
    id: 4,
    eventId: 'evt-004',
    eventName: 'Manasik Haji - Praktik Tawaf II',
    eventDate: '2026-01-05',
    checkInTime: null,
    status: 'absen',
  },
  {
    id: 5,
    eventId: 'evt-005',
    eventName: 'Manasik Haji - Praktik Tawaf',
    eventDate: '2026-01-06',
    checkInTime: '07:48',
    status: 'hadir',
  },
  {
    id: 6,
    eventId: 'evt-006',
    eventName: 'Bimbingan Rohani & Doa',
    eventDate: '2026-01-08',
    checkInTime: '08:12',
    status: 'hadir',
  },
  {
    id: 7,
    eventId: 'evt-007',
    eventName: 'Pemeriksaan Kesehatan',
    eventDate: '2026-01-10',
    checkInTime: '09:02',
    status: 'hadir',
  },
  {
    id: 8,
    eventId: 'evt-008',
    eventName: 'Kajian Fiqih Haji',
    eventDate: '2026-01-11',
    checkInTime: '08:05',
    status: 'hadir',
  },
  {
    id: 9,
    eventId: 'evt-009',
    eventName: 'Kajian Fiqih Haji II',
    eventDate: '2026-01-12',
    checkInTime: null,
    status: 'absen',
  },
  {
    id: 10,
    eventId: 'evt-010',
    eventName: "Manasik Haji - Praktik Sa'i",
    eventDate: '2026-01-13',
    checkInTime: '07:40',
    status: 'hadir',
  },
  {
    id: 11,
    eventId: 'evt-011',
    eventName: 'Pembinaan Keluarga Sakinah',
    eventDate: '2026-01-15',
    checkInTime: '08:20',
    status: 'hadir',
  },
  {
    id: 12,
    eventId: 'evt-012',
    eventName: "Kajian Sejarah Ka'bah",
    eventDate: '2026-01-17',
    checkInTime: '08:00',
    status: 'hadir',
  },
  {
    id: 13,
    eventId: 'evt-013',
    eventName: 'Simulasi Lontar Jumrah',
    eventDate: '2026-01-18',
    checkInTime: '07:52',
    status: 'hadir',
  },
  {
    id: 14,
    eventId: 'evt-014',
    eventName: 'Bimbingan Rohani & Doa II',
    eventDate: '2026-01-19',
    checkInTime: null,
    status: 'absen',
  },
  {
    id: 15,
    eventId: 'evt-015',
    eventName: 'Bimbingan Ibadah Umrah',
    eventDate: '2026-01-20',
    checkInTime: '08:30',
    status: 'hadir',
  },
  {
    id: 16,
    eventId: 'evt-016',
    eventName: 'Pemeriksaan Kesehatan Lanjutan',
    eventDate: '2026-01-21',
    checkInTime: '09:15',
    status: 'hadir',
  },
  {
    id: 17,
    eventId: 'evt-017',
    eventName: 'Kajian Doa & Dzikir',
    eventDate: '2026-01-23',
    checkInTime: '08:08',
    status: 'hadir',
  },
  {
    id: 18,
    eventId: 'evt-018',
    eventName: 'Manasik Haji - Praktik Ihram',
    eventDate: '2026-01-24',
    checkInTime: '07:35',
    status: 'hadir',
  },
  {
    id: 19,
    eventId: 'evt-019',
    eventName: 'Pemeriksaan Kesehatan Berkala',
    eventDate: '2026-01-25',
    checkInTime: null,
    status: 'absen',
  },
  {
    id: 20,
    eventId: 'evt-020',
    eventName: 'Pembinaan Adab Jamaah',
    eventDate: '2026-01-26',
    checkInTime: '08:18',
    status: 'hadir',
  },
  {
    id: 21,
    eventId: 'evt-021',
    eventName: 'Kajian Haji Mandiri II',
    eventDate: '2026-01-28',
    checkInTime: '08:02',
    status: 'hadir',
  },
  {
    id: 22,
    eventId: 'evt-022',
    eventName: 'Penyuluhan Kesehatan Lansia',
    eventDate: '2026-01-30',
    checkInTime: '09:05',
    status: 'hadir',
  },
];

export default MOCK_MY_ATTENDANCE;
