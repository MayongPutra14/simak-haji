import { Link } from 'react-router';
import {
  IconCalendar,
  IconCheck,
  IconClose,
  IconEye,
} from '../../utils/helpers/decorations';
import { formatAttendanceRecapDate } from '../../utils/helpers/attendanceRecap';
import AttendanceRateBar from '../../components/attendance/shared/AttendanceRateBar';

const COUNT_PILL_BASE =
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold';

/**
 * Column config for the attendance recap table.
 * Mirrors the mobile card fields so both layouts stay in sync.
 */
export const getAttendanceRecapColumns = () => [
  {
    key: 'eventName',
    header: 'Kegiatan',
    isSticky: true,
    className: 'min-w-60',
    render: (event) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold wrap-break-words text-slate-900">
          {event.eventName || '-'}
        </span>
        <span className="mt-0.5 text-xs font-medium text-slate-400">
          {event.location || '-'}
        </span>
      </div>
    ),
  },
  {
    key: 'eventDate',
    header: 'Tanggal',
    className: 'whitespace-nowrap',
    render: (event) => (
      <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 sm:text-sm">
        <IconCalendar className="h-4 w-4 text-slate-400" aria-hidden="true" />
        {formatAttendanceRecapDate(event.eventDate)}
      </span>
    ),
  },
  {
    key: 'totalPresent',
    header: 'Hadir',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (event) => (
      <span
        className={`${COUNT_PILL_BASE} border-emerald-200 bg-emerald-100 text-emerald-800`}
      >
        <IconCheck className="h-3.5 w-3.5" aria-hidden="true" />
        {event.totalPresent} Jamaah
      </span>
    ),
  },
  {
    key: 'totalAbsent',
    header: 'Tidak Hadir',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (event) => (
      <span
        className={`${COUNT_PILL_BASE} border-rose-200 bg-rose-100 text-rose-800`}
      >
        <IconClose className="h-3.5 w-3.5" aria-hidden="true" />
        {event.totalAbsent} Jamaah
      </span>
    ),
  },
  {
    key: 'percentage',
    header: 'Persentase',
    className: 'min-w-45',
    render: (event) => (
      <AttendanceRateBar
        percentage={event.percentage}
        present={event.totalPresent}
        absent={event.totalAbsent}
      />
    ),
  },
  {
    key: 'actions',
    header: 'Aksi',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (event) =>
      event.eventId ? (
        <Link
          to={`/absensi/rekap-kehadiran/${event.eventId}`}
          title="Lihat detail kegiatan"
          className="mx-auto inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
        >
          <IconEye className="h-4 w-4" aria-hidden="true" />
          Lihat Detail
        </Link>
      ) : (
        <span className="text-xs text-slate-400">-</span>
      ),
  },
];
