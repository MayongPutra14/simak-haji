import Table from '../../ui/global/Table';
import {
  formatCheckInTime,
  formatShortDate,
} from '../../../utils/helpers/dateConversion';
import AttendanceStatusBadge from './AttendanceStatusBadge';

const COLUMNS = [
  {
    key: 'eventName',
    header: 'Kegiatan',
    className: 'min-w-56 font-semibold text-slate-800',
  },
  {
    key: 'eventDate',
    header: 'Tanggal',
    className: 'whitespace-nowrap text-slate-500',
    render: (record) => formatShortDate(record.eventDate),
  },
  {
    key: 'checkInTime',
    header: 'Jam',
    className: 'whitespace-nowrap',
    render: (record) => (
      <span
        className={
          record.checkInTime
            ? 'font-semibold text-teal-700'
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
    align: 'right',
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
        showNumbering={false}
        headerBgClass="border-sea-green-100 bg-sea-green-50/70 text-sea-green-900"
        emptyMessage="Belum ada riwayat absensi."
      />
    </div>
  );
}
