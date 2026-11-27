import { Link } from 'react-router';
import { AttendanceStatusBadge } from '../../components/ui/global/StatusComponents';
import AttendanceAvatar from '../../components/attendance/shared/AttendanceAvatar';
import { getParticipantRegionLabel } from '../../utils/helpers/attendanceRecap';
import { formatCheckInTime } from '../../utils/helpers/dateConversion';

/**
 * Congregant identity cell shared by the desktop table and the mobile card.
 * The name links to the jamaah history page and carries `state.from` so that
 * page can return to the exact event detail URL.
 */
export const renderParticipantName = (participant, fromPath = '') => {
  const name = participant.fullName || '-';

  const content = (
    <>
      <AttendanceAvatar
        photoUrl={participant.photoUrl}
        fullName={participant.fullName}
        status={participant.status}
      />
      <span className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-sea-green-700">
        {name}
      </span>
    </>
  );

  if (!participant.userId) {
    return <span className="flex min-w-0 items-center gap-2.5">{content}</span>;
  }

  return (
    <Link
      to={`/attendance/members/${participant.userId}`}
      state={{ from: fromPath }}
      title={`Lihat riwayat ${name}`}
      className="group flex min-w-0 items-center gap-2.5"
    >
      {content}
    </Link>
  );
};

/**
 * Column config for the event participant table.
 * Mirrors the mobile card fields so both layouts stay in sync.
 */
export const getEventParticipantColumns = ({ fromPath = '' } = {}) => [
  {
    key: 'fullName',
    header: 'Nama Jamaah',
    isSticky: true,
    render: (participant) => renderParticipantName(participant, fromPath),
  },
  {
    key: 'regionName',
    header: 'Wilayah',
    render: (participant) => (
      <span className="text-xs text-slate-600 sm:text-sm">
        {getParticipantRegionLabel(participant)}
      </span>
    ),
  },
  {
    key: 'checkInTime',
    header: 'Waktu Absen',
    className: 'whitespace-nowrap',
    render: (participant) => (
      <span
        className={`text-xs sm:text-sm ${
          participant.checkInTime
            ? 'font-semibold text-emerald-700'
            : 'font-medium text-slate-400'
        }`}
      >
        {formatCheckInTime(participant.checkInTime)}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    className: 'whitespace-nowrap',
    render: (participant) => (
      <AttendanceStatusBadge status={participant.status} />
    ),
  },
];
