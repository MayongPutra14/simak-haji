import AttendanceStatusBadge from './AttendanceStatusBadge';
import {
  formatCheckInTime,
  formatShortDate,
} from '../../../utils/helpers/dateConversion';
import { IconClock } from '../../../utils/helpers/decorations';

/**
 * Mobile history card (< md). Keeps the PRD 8.2 rule: no wide tables on phones.
 */
export default function AttendanceHistoryCard({ record }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-colors hover:border-sea-green-200">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="wrap-break-words text-sm font-semibold leading-5 text-slate-800">
            {record.eventName}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {formatShortDate(record.eventDate)}
          </p>
        </div>

        <AttendanceStatusBadge status={record.status} className="shrink-0" />
      </div>

      <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5 text-xs">
        <IconClock
          className="h-4 w-4 shrink-0 text-slate-400"
          aria-hidden="true"
        />
        <span className="text-slate-400">Jam Presensi</span>
        <span
          className={`ml-auto font-semibold ${
            record.checkInTime ? 'text-teal-700' : 'text-slate-400'
          }`}
        >
          {formatCheckInTime(record.checkInTime)}
        </span>
      </div>
    </article>
  );
}
