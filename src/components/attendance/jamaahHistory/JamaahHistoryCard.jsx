import { AttendanceStatusBadge } from '../../ui/global/StatusComponents';
import {
  formatCheckInTime,
  formatDateIndonesia,
} from '../../../utils/helpers/dateConversion';
import { IconCalendar } from '../../../utils/helpers/decorations';

/**
 * Mobile history card. Carries the same fields as the desktop table row:
 * number, kegiatan, date, check-in time, and status.
 */
export default function JamaahHistoryCard({ record, number }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <header className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold wrap-break-words text-slate-900">
            {record.eventName || '-'}
          </h3>

          {record.location && (
            <p className="mt-0.5 text-xs wrap-break-words text-slate-500">
              {record.location}
            </p>
          )}

          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <IconCalendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {formatDateIndonesia(record.eventDate)}
          </p>
        </div>

        <AttendanceStatusBadge status={record.status} className="shrink-0" />
      </header>

      <dl className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        <dt className="text-slate-500">Waktu Absen</dt>
        <dd
          className={
            record.checkInTime
              ? 'font-semibold text-emerald-700'
              : 'font-medium text-slate-400'
          }
        >
          {formatCheckInTime(record.checkInTime)}
        </dd>
      </dl>
    </article>
  );
}
