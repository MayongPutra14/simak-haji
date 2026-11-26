import { AttendanceStatusBadge } from '../../ui/global/StatusComponents';
import { renderParticipantName } from '../../../features/attendance/EventParticipantColumns';
import { getParticipantRegionLabel } from '../../../utils/helpers/attendanceRecap';
import { formatCheckInTime } from '../../../utils/helpers/dateConversion';

/**
 * Mobile participant card. Carries the same fields as the desktop table row:
 * number, congregant identity, region, check-in time, and status.
 */
export default function EventParticipantCard({
  participant,
  number,
  fromPath = '',
}) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <header className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
          {number}
        </span>

        <div className="min-w-0 flex-1">
          {renderParticipantName(participant, fromPath)}

          <p className="mt-1 text-xs text-slate-500">
            {getParticipantRegionLabel(participant)}
          </p>
        </div>

        <AttendanceStatusBadge
          status={participant.status}
          className="shrink-0"
        />
      </header>

      <dl className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        <dt className="text-slate-500">Waktu Absen</dt>
        <dd
          className={
            participant.checkInTime
              ? 'font-semibold text-emerald-700'
              : 'font-medium text-slate-400'
          }
        >
          {formatCheckInTime(participant.checkInTime)}
        </dd>
      </dl>
    </article>
  );
}
