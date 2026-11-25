import { Link } from 'react-router';
import {
  IconCalendar,
  IconCheck,
  IconClose,
  IconEye,
  IconLocation,
} from '../../../utils/helpers/decorations';
import { formatAttendanceRecapDate } from '../../../utils/helpers/attendanceRecap';
import AttendanceRateBar from '../shared/AttendanceRateBar';

const COUNT_PILL_BASE =
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold';

/**
 * Mobile recap card. Carries the same fields as the desktop table row:
 * number, kegiatan + location, date, hadir/absen counts and percentage.
 */
export default function AttendanceRecapCard({ event, number }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <header className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
          {number}
        </span>

        <div className="min-w-0">
          <h3 className="text-sm font-bold wrap-break-words text-slate-900">
            {event.eventName || '-'}
          </h3>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <IconLocation className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="wrap-break-words">{event.location || '-'}</span>
          </p>

          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
            <IconCalendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {formatAttendanceRecapDate(event.eventDate)}
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`${COUNT_PILL_BASE} border-emerald-200 bg-emerald-100 text-emerald-800`}
        >
          <IconCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {event.totalPresent} Hadir
        </span>

        <span
          className={`${COUNT_PILL_BASE} border-rose-200 bg-rose-100 text-rose-800`}
        >
          <IconClose className="h-3.5 w-3.5" aria-hidden="true" />
          {event.totalAbsent} Tidak Hadir
        </span>
      </div>

      <AttendanceRateBar
        percentage={event.percentage}
        present={event.totalPresent}
        absent={event.totalAbsent}
      />

      {event.eventId && (
        <footer className="border-t border-slate-100 pt-3">
          <Link
            to={`/absensi/rekap-kehadiran/${event.eventId}`}
            title="Lihat detail kegiatan"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
          >
            <IconEye className="h-4 w-4" aria-hidden="true" />
            Lihat Detail
          </Link>
        </footer>
      )}
    </article>
  );
}
