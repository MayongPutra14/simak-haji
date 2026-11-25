import { useMemo } from 'react';
import Table from '../../ui/global/Table';
import { ATTENDANCE_RECAP_PAGE_SIZE } from '../../../utils/helpers/attendanceRecap';
import { getAttendanceRecapColumns } from '../../../features/attendance/AttendanceRecapColumns';

/**
 * Desktop recap table. The server-style hook already returns only the current
 * page, so numbering reads from the pagination object.
 */
export default function AttendanceRecapTable({
  events = [],
  pagination,
  isLoading,
}) {
  const columns = useMemo(() => getAttendanceRecapColumns(), []);

  return (
    <Table
      columns={columns}
      data={events}
      rowKey="id"
      currentPage={pagination?.page ?? 1}
      itemsPerPage={pagination?.perPage ?? ATTENDANCE_RECAP_PAGE_SIZE}
      isLoading={isLoading}
      emptyMessage="Belum ada kegiatan selesai pada periode ini."
      headerBgClass="bg-sea-green-500 text-white"
      stickyBgClass="bg-sea-green-500 text-white"
    />
  );
}
