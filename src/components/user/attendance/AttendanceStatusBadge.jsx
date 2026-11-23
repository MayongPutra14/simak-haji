import { MdCancel, MdCheckCircle } from 'react-icons/md';
import { ATTENDANCE_STATUS } from '../../../utils/helpers/constant';
import { getAttendanceStatus } from '../../../utils/helpers/status';

/**
 * Hadir / Absen badge shared by the jamaah page and, later, the admin/leader pages.
 * Reuses the project's `getAttendanceStatus` so colors stay consistent.
 */
export default function AttendanceStatusBadge({ status, className = '' }) {
  const isPresent = status === ATTENDANCE_STATUS.PRESENT;
  const config = getAttendanceStatus(status, isPresent);
  const Icon = isPresent ? MdCheckCircle : MdCancel;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-4 ${config.badgeClass} ${className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {config.label}
    </span>
  );
}
