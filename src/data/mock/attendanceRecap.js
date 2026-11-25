import {
  ATTENDANCE_ALL_VALUE,
  ATTENDANCE_STATUS,
} from '../../utils/helpers/constant';
import {
  calculateAttendanceStats,
  sortAttendanceRecords,
} from '../../utils/helpers/attendance';
import {
  applyAttendanceScope,
  ATTENDANCE_RECAP_PAGE_SIZE,
  ATTENDANCE_ZONE_NOT_SET_MESSAGE,
  calculateParticipantStats,
  calculateRecapStats,
  filterJamaahHistory,
  filterParticipants,
  filterRecapEvents,
  getRecapFilterOptions,
  isCompletedEvent,
  normalizeJamaahHistoryRecords,
  normalizeJamaahIdentity,
  normalizeParticipants,
  normalizeRecapEvents,
  normalizeZone,
  paginateRows,
} from '../../utils/helpers/attendanceRecap';

/**
 * MOCK DATA ONLY - delete this whole file in Phase 3 (docs/task.md 3.2).
 * Every value below is seeded and deterministic: no Math.random at render.
 */

const MOCK_LATENCY_MS = 300;

const MESSAGES = {
  eventNotFound: 'Kegiatan tidak ditemukan.',
  eventNotCompleted: 'Rekap hanya tersedia untuk kegiatan yang telah selesai.',
  eventOutOfScope: 'Anda tidak memiliki akses ke kegiatan di luar zona Anda.',
  jamaahNotFound: 'Data jamaah tidak ditemukan.',
  jamaahOutOfScope:
    'Anda tidak memiliki akses ke data jamaah di luar zona Anda.',
};

// 30 SEEDED JAMAAH, 5 PER ZONE (A-F)
const JAMAHA_SEED = [
  {
    fullName: 'Ahmad Fauzi',
    zone: 'A',
    batch: 'Kloter 01',
    portionNumber: 'A-001',
  },
  {
    fullName: 'Siti Aminah',
    zone: 'A',
    batch: 'Kloter 01',
    portionNumber: 'A-002',
  },
  {
    fullName: 'Muhammad Ridwan',
    zone: 'A',
    batch: 'Kloter 01',
    portionNumber: 'A-003',
  },
  {
    fullName: 'Nur Hasanah',
    zone: 'A',
    batch: 'Kloter 01',
    portionNumber: 'A-004',
  },
  {
    fullName: 'Abdul Rahman',
    zone: 'A',
    batch: 'Kloter 01',
    portionNumber: 'A-005',
  },
  {
    fullName: 'Budi Santoso',
    zone: 'B',
    batch: 'Kloter 02',
    portionNumber: 'B-001',
  },
  {
    fullName: 'Dewi Lestari',
    zone: 'B',
    batch: 'Kloter 02',
    portionNumber: 'B-002',
  },
  {
    fullName: 'Agus Setiawan',
    zone: 'B',
    batch: 'Kloter 02',
    portionNumber: 'B-003',
  },
  {
    fullName: 'Rina Marlina',
    zone: 'B',
    batch: 'Kloter 02',
    portionNumber: 'B-004',
  },
  {
    fullName: 'Hendra Gunawan',
    zone: 'B',
    batch: 'Kloter 02',
    portionNumber: 'B-005',
  },
  {
    fullName: 'Candra Wijaya',
    zone: 'C',
    batch: 'Kloter 03',
    portionNumber: 'C-001',
  },
  {
    fullName: 'Maya Sari',
    zone: 'C',
    batch: 'Kloter 03',
    portionNumber: 'C-002',
  },
  {
    fullName: 'Dedi Kurniawan',
    zone: 'C',
    batch: 'Kloter 03',
    portionNumber: 'C-003',
  },
  {
    fullName: 'Fitri Handayani',
    zone: 'C',
    batch: 'Kloter 03',
    portionNumber: 'C-004',
  },
  {
    fullName: 'Irfan Maulana',
    zone: 'C',
    batch: 'Kloter 03',
    portionNumber: 'C-005',
  },
  {
    fullName: 'Diah Puspita',
    zone: 'D',
    batch: 'Kloter 04',
    portionNumber: 'D-001',
  },
  {
    fullName: 'Eko Prasetyo',
    zone: 'D',
    batch: 'Kloter 04',
    portionNumber: 'D-002',
  },
  {
    fullName: 'Lilis Suryani',
    zone: 'D',
    batch: 'Kloter 04',
    portionNumber: 'D-003',
  },
  {
    fullName: 'Fajar Nugroho',
    zone: 'D',
    batch: 'Kloter 04',
    portionNumber: 'D-004',
  },
  {
    fullName: 'Wulan Sari',
    zone: 'D',
    batch: 'Kloter 04',
    portionNumber: 'D-005',
  },
  {
    fullName: 'Galih Pratama',
    zone: 'E',
    batch: 'Kloter 05',
    portionNumber: 'E-001',
  },
  {
    fullName: 'Hesti Wulandari',
    zone: 'E',
    batch: 'Kloter 05',
    portionNumber: 'E-002',
  },
  {
    fullName: 'Imam Syafii',
    zone: 'E',
    batch: 'Kloter 05',
    portionNumber: 'E-003',
  },
  {
    fullName: 'Kartika Dewi',
    zone: 'E',
    batch: 'Kloter 05',
    portionNumber: 'E-004',
  },
  {
    fullName: 'Lukman Hakim',
    zone: 'E',
    batch: 'Kloter 05',
    portionNumber: 'E-005',
  },
  {
    fullName: 'Maman Suherman',
    zone: 'F',
    batch: 'Kloter 06',
    portionNumber: 'F-001',
  },
  {
    fullName: 'Nia Ramadhani',
    zone: 'F',
    batch: 'Kloter 06',
    portionNumber: 'F-002',
  },
  {
    fullName: 'Oki Setiana',
    zone: 'F',
    batch: 'Kloter 06',
    portionNumber: 'F-003',
  },
  {
    fullName: 'Putri Ayu',
    zone: 'F',
    batch: 'Kloter 06',
    portionNumber: 'F-004',
  },
  {
    fullName: 'Rizal Fauzi',
    zone: 'F',
    batch: 'Kloter 06',
    portionNumber: 'F-005',
  },
];

const JAMAHA = JAMAHA_SEED.map((jamaah, index) => ({
  ...jamaah,
  userId: 1001 + index,
  regionName: `Wilayah ${jamaah.zone}`,
}));

// 10 COMPLETED EVENTS (JAN-FEB 2026) + 2 NOT COMPLETED, TO PROVE 5.2
const BASE_EVENTS = [
  {
    id: 101,
    eventName: 'Kajian Haji Mandiri Sesi 1',
    date: '2026-01-11',
    timeStart: '2026-01-11 08:00:00',
    timeEnd: '2026-01-11 11:00:00',
    location: 'Gedung Dakwah Karawang Barat',
    zone: 'A',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 102,
    eventName: 'Bimbingan Manasik Haji Akbar',
    date: '2026-01-15',
    timeStart: '2026-01-15 07:30:00',
    timeEnd: '2026-01-15 12:00:00',
    location: 'Masjid Agung Syekh Quro Karawang',
    zone: 'B',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 103,
    eventName: 'Kajian Fiqih Haji Sesi 2',
    date: '2026-01-18',
    timeStart: '2026-01-18 08:00:00',
    timeEnd: '2026-01-18 10:30:00',
    location: 'Aula Kecamatan Klari',
    zone: 'C',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 104,
    eventName: 'Pelatihan Rukun Haji Praktis',
    date: '2026-01-22',
    timeStart: '2026-01-22 08:00:00',
    timeEnd: '2026-01-22 11:30:00',
    location: 'Gedung Serbaguna Telukjambe',
    zone: 'D',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 105,
    eventName: 'Kajian Kesehatan Jamaah Haji',
    date: '2026-01-25',
    timeStart: '2026-01-25 09:00:00',
    timeEnd: '2026-01-25 11:00:00',
    location: 'Puskesmas Pangkalan',
    zone: 'E',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 106,
    eventName: 'Tausiyah Persaudaraan Haji',
    date: '2026-01-29',
    timeStart: '2026-01-29 08:00:00',
    timeEnd: '2026-01-29 10:00:00',
    location: 'Masjid Jami Rengasdengklok',
    zone: 'F',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 107,
    eventName: 'Kajian Haji Mandiri Sesi 3',
    date: '2026-02-02',
    timeStart: '2026-02-02 08:00:00',
    timeEnd: '2026-02-02 11:00:00',
    location: 'Gedung Dakwah Karawang Barat',
    zone: 'A',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 108,
    eventName: 'Manasik Haji Lanjutan',
    date: '2026-02-05',
    timeStart: '2026-02-05 07:30:00',
    timeEnd: '2026-02-05 11:30:00',
    location: 'Masjid Agung Syekh Quro Karawang',
    zone: 'B',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 109,
    eventName: 'Kajian Adab Perjalanan Haji',
    date: '2026-02-09',
    timeStart: '2026-02-09 08:00:00',
    timeEnd: '2026-02-09 10:30:00',
    location: 'Aula Kecamatan Klari',
    zone: 'C',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 110,
    eventName: 'Evaluasi Kesiapan Jamaah',
    date: '2026-02-12',
    timeStart: '2026-02-12 08:00:00',
    timeEnd: '2026-02-12 11:00:00',
    location: 'Gedung Serbaguna Telukjambe',
    zone: 'D',
    category: 'jamaah',
    status: 'selesai',
  },
  {
    id: 111,
    eventName: 'Kajian Haji Mandiri Sesi 4',
    date: '2026-02-20',
    timeStart: '2026-02-20 08:00:00',
    timeEnd: '2026-02-20 11:00:00',
    location: 'Gedung Dakwah Karawang Barat',
    zone: 'A',
    category: 'jamaah',
    status: 'live',
  },
  {
    id: 112,
    eventName: 'Persiapan Keberangkatan Gelombang II',
    date: '2026-03-01',
    timeStart: '2026-03-01 08:00:00',
    timeEnd: '2026-03-01 12:00:00',
    location: 'Masjid Agung Syekh Quro Karawang',
    zone: 'B',
    category: 'jamaah',
    status: 'mendatang',
  },
];

const buildCheckInTime = (timeStart, participantIndex, eventIndex) => {
  const timePart = String(timeStart ?? '').split(' ')[1] || '08:00:00';
  const [hours = '08', minutes = '00'] = timePart.split(':');
  const totalMinutes =
    Number(hours) * 60 +
    Number(minutes) +
    2 +
    ((participantIndex * 7 + eventIndex * 5) % 35);
  const normalizedMinutes = totalMinutes % (24 * 60);

  return `${String(Math.floor(normalizedMinutes / 60)).padStart(2, '0')}:${String(
    normalizedMinutes % 60,
  ).padStart(2, '0')}`;
};

/**
 * Deterministic attendance: jamaah of the event's zone, with a seeded
 * present/absent pattern so percentages vary between events.
 */
const buildParticipants = (event, eventIndex) => {
  const members = JAMAHA.filter((jamaah) => jamaah.zone === event.zone);

  return normalizeParticipants(
    members.map((jamaah, participantIndex) => {
      const isPresent =
        (participantIndex + eventIndex) % (3 + (eventIndex % 2)) !== 1;

      return {
        userId: jamaah.userId,
        fullName: jamaah.fullName,
        zone: jamaah.zone,
        regionName: jamaah.regionName,
        checkInTime: isPresent
          ? buildCheckInTime(event.timeStart, participantIndex, eventIndex)
          : null,
        status: isPresent
          ? ATTENDANCE_STATUS.PRESENT
          : ATTENDANCE_STATUS.ABSENT,
      };
    }),
  );
};

const MOCK_EVENTS = [];
const PARTICIPANTS_BY_EVENT = {};

BASE_EVENTS.forEach((event, eventIndex) => {
  const participants = buildParticipants(event, eventIndex);
  const totalPresent = participants.filter(
    (participant) => participant.status === ATTENDANCE_STATUS.PRESENT,
  ).length;
  const totalAbsent = participants.length - totalPresent;

  const normalized = normalizeRecapEvents([
    {
      ...event,
      totalPresent,
      totalAbsent,
      totalParticipants: participants.length,
      percentage:
        participants.length === 0
          ? 0
          : Math.round((totalPresent / participants.length) * 100),
    },
  ])[0];

  MOCK_EVENTS.push(normalized);
  PARTICIPANTS_BY_EVENT[String(normalized.eventId)] = participants;
});

const COMPLETED_EVENTS = sortAttendanceRecords(
  MOCK_EVENTS.filter(isCompletedEvent),
);

const buildJamaahHistory = (jamaah) => {
  const records = COMPLETED_EVENTS.filter(
    (event) => event.zone === jamaah.zone,
  ).map((event) => {
    const participant = (
      PARTICIPANTS_BY_EVENT[String(event.eventId)] || []
    ).find((item) => String(item.userId) === String(jamaah.userId));

    if (!participant) return null;

    return {
      id: `history-${event.eventId}-${jamaah.userId}`,
      eventId: event.eventId,
      eventName: event.eventName,
      eventDate: event.eventDate,
      checkInTime: participant.checkInTime,
      status: participant.status,
      zone: event.zone,
      location: event.location,
    };
  });

  return sortAttendanceRecords(
    normalizeJamaahHistoryRecords(records.filter(Boolean)),
  );
};

const simulateLatency = () =>
  new Promise((resolve) => {
    setTimeout(resolve, MOCK_LATENCY_MS);
  });

const success = (data, message) => ({
  status: 'success',
  message,
  data,
});

const failure = (message) => ({
  status: 'failed',
  message,
});

const getScopePayload = (scope) => ({
  role: scope?.role ?? '',
  zone: scope?.zone ?? null,
  isZoneLocked: Boolean(scope?.isZoneLocked),
});

const resolveEventZone = (event) => normalizeZone(event?.zone);

/**
 * Mock transport for `get_attendance_recap`.
 */
export const getAttendanceRecapMock = async (request = {}) => {
  await simulateLatency();

  const scope = request.scope || {};
  if (scope.isBlocked) return failure(ATTENDANCE_ZONE_NOT_SET_MESSAGE);

  const scopedEvents = applyAttendanceScope(COMPLETED_EVENTS, scope);
  const stats = calculateRecapStats(scopedEvents);
  const filters = getRecapFilterOptions(scopedEvents);

  // LEADERS NEVER FILTER BY ZONE; THE SCOPE IS ALWAYS THEIR OWN ZONE
  const zoneFilter = scope.isZoneLocked
    ? ATTENDANCE_ALL_VALUE
    : (request.zone ?? ATTENDANCE_ALL_VALUE);

  const filteredEvents = filterRecapEvents(scopedEvents, {
    search: request.search,
    month: request.month ?? ATTENDANCE_ALL_VALUE,
    year: request.year ?? ATTENDANCE_ALL_VALUE,
    zone: zoneFilter,
  });

  const { rows, pagination } = paginateRows(
    filteredEvents,
    request.page ?? 1,
    request.perPage ?? ATTENDANCE_RECAP_PAGE_SIZE,
  );

  return success(
    {
      stats,
      events: rows,
      pagination,
      scope: getScopePayload(scope),
      filters,
    },
    'Rekap kehadiran berhasil diambil.',
  );
};

/**
 * Mock transport for `get_event_attendance_detail`.
 */
export const getEventAttendanceDetailMock = async (request = {}) => {
  await simulateLatency();

  const scope = request.scope || {};
  if (scope.isBlocked) return failure(ATTENDANCE_ZONE_NOT_SET_MESSAGE);

  const event = MOCK_EVENTS.find(
    (item) => String(item.eventId) === String(request.eventId),
  );

  if (!event) return failure(MESSAGES.eventNotFound);
  if (!isCompletedEvent(event)) return failure(MESSAGES.eventNotCompleted);

  const eventZone = resolveEventZone(event);
  const scopeZone = normalizeZone(scope.zone);

  if (scope.isZoneLocked && eventZone && eventZone !== scopeZone) {
    return failure(MESSAGES.eventOutOfScope);
  }

  const eventParticipants = PARTICIPANTS_BY_EVENT[String(event.eventId)] || [];
  const scopedParticipants = applyAttendanceScope(eventParticipants, scope);
  const stats = calculateParticipantStats(scopedParticipants);

  const zoneFilter = scope.isZoneLocked
    ? ATTENDANCE_ALL_VALUE
    : (request.zone ?? ATTENDANCE_ALL_VALUE);

  const filteredParticipants = filterParticipants(scopedParticipants, {
    search: request.search,
    status: request.status ?? ATTENDANCE_ALL_VALUE,
    zone: zoneFilter,
  });

  const { rows, pagination } = paginateRows(
    filteredParticipants,
    request.page ?? 1,
    request.perPage ?? ATTENDANCE_RECAP_PAGE_SIZE,
  );

  return success(
    {
      event,
      stats,
      participants: rows,
      pagination,
    },
    'Detail kehadiran kegiatan berhasil diambil.',
  );
};

/**
 * Mock transport for `get_jamaah_attendance_history`.
 * A leader asking for a jamaah outside their zone receives `status: failed`.
 */
export const getJamaahAttendanceHistoryMock = async (request = {}) => {
  await simulateLatency();

  const scope = request.scope || {};
  if (scope.isBlocked) return failure(ATTENDANCE_ZONE_NOT_SET_MESSAGE);

  const jamaah = JAMAHA.find(
    (item) => String(item.userId) === String(request.userId),
  );

  if (!jamaah) return failure(MESSAGES.jamaahNotFound);

  if (scope.isZoneLocked && jamaah.zone !== normalizeZone(scope.zone)) {
    return failure(MESSAGES.jamaahOutOfScope);
  }

  const scopedRecords = applyAttendanceScope(buildJamaahHistory(jamaah), scope);
  const stats = calculateAttendanceStats(scopedRecords);

  const filteredRecords = filterJamaahHistory(scopedRecords, {
    search: request.search,
    month: request.month ?? ATTENDANCE_ALL_VALUE,
    status: request.status ?? ATTENDANCE_ALL_VALUE,
  });

  const { rows, pagination } = paginateRows(
    filteredRecords,
    request.page ?? 1,
    request.perPage ?? ATTENDANCE_RECAP_PAGE_SIZE,
  );

  return success(
    {
      jamaah: normalizeJamaahIdentity(jamaah),
      stats,
      records: rows,
      pagination,
    },
    'Riwayat kehadiran jamaah berhasil diambil.',
  );
};
