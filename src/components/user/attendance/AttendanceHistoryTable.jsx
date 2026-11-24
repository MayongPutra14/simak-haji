import Table from '../../ui/global/Table';
import AttendanceStatusBadge from './AttendanceStatusBadge';
import {
  formatCheckInTime,
  formatShortDate,
} from '../../../utils/helpers/dateConversion';

const COLUMNS = [
  {
    key: 'eventName',
    header: 'Kegiatan',
    className: 'max-w-56 font-semibold text-slate-800',
  },
  {
    key: 'eventDate',
    header: 'Tanggal',
    align: 'center',
    className: 'whitespace-nowrap text-slate-500',
    render: (record) => formatShortDate(record.eventDate),
  },
  {
    key: 'checkInTime',
    header: 'Waktu Absen',
    className: 'whitespace-nowrap',
    align: 'center',
    render: (record) => (
      <span
        className={
          record.checkInTime
            ? 'font-medium text-teal-700'
            : 'font-medium text-slate-400'
        }
      >
        {formatCheckInTime(record.checkInTime)}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (record) => <AttendanceStatusBadge status={record.status} />,
  },
];

/**
 * Desktop history table (md+). Mobile falls back to `AttendanceHistoryCard`.
 */
export default function AttendanceHistoryTable({ records }) {
  return (
    <div className="hidden md:block">
      <Table
        columns={COLUMNS}
        data={records}
        rowKey="id"
        headerBgClass="bg-sea-green-500 text-white"
        emptyMessage="Belum ada riwayat absensi."
      />
    </div>
  );
}
