import { Link } from 'react-router';
import { IconCheck, IconClose, IconEye } from '../../utils/helpers/decorations';
import AttendanceRateBar from '../../components/attendance/shared/AttendanceRateBar';
import { formatDateIndonesia } from '../../utils/helpers/dateConversion';

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
      <span className="text-sm wrap-break-words ">
        {event.eventName || '-'}
      </span>
    ),
  },
  {
    key: 'eventDate',
    header: 'Tanggal',
    className: 'whitespace-nowrap',
    render: (event) => (
      <span className="inline-flex items-center gap-2 text-xs   sm:text-sm">
        {formatDateIndonesia(event.eventDate)}
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
          to={`/attendance/recaps/${event.eventId}`}
          title="Lihat detail kegiatan"
          className="mx-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-600 hover:text-white"
        >
          <IconEye className="h-4 w-4" aria-hidden="true" />
          Lihat Detail
        </Link>
      ) : (
        <span className="text-xs text-slate-400">-</span>
      ),
  },
];
