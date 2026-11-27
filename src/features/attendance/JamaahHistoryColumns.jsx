import { AttendanceStatusBadge } from '../../components/ui/global/StatusComponents';
import { JamaahHistoryZoneBadge } from '../../components/attendance/jamaahHistory/JamaahHistoryBadges';
import {
  formatCheckInTime,
  formatDateIndonesia,
} from '../../utils/helpers/dateConversion';

/**
 * Column config for one jamaah's attendance history table.
 * Mirrors the mobile card fields so both layouts stay in sync.
 */
export const getJamaahHistoryColumns = () => [
  {
    key: 'eventName',
    header: 'Kegiatan',
    isSticky: true,
    className: 'min-w-60',
    render: (record) => (
      <div className="flex flex-col">
        <span className="text-sm wrap-break-words text-slate-900">
          {record.eventName || '-'}
        </span>

        {record.location && (
          <span className="mt-0.5 text-xs text-slate-500">
            {record.location}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'eventDate',
    header: 'Tanggal',
    className: 'whitespace-nowrap',
    render: (record) => (
      <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
        {formatDateIndonesia(record.eventDate)}
      </span>
    ),
  },
  {
    key: 'eventZone',
    header: 'Zona / Wilayah',
    className: 'whitespace-nowrap',
    render: (record) => (
      <JamaahHistoryZoneBadge regionName={record.eventRegionName} />
    ),
  },
  {
    key: 'checkInTime',
    header: 'Waktu Absen',
    className: 'whitespace-nowrap',
    render: (record) => (
      <span
        className={`text-xs sm:text-sm ${
          record.checkInTime
            ? 'font-semibold text-emerald-700'
            : 'font-medium text-slate-400'
        }`}
      >
        {formatCheckInTime(record.checkInTime)}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    align: 'right',
    className: 'whitespace-nowrap',
    render: (record) => <AttendanceStatusBadge status={record.status} />,
  },
];
