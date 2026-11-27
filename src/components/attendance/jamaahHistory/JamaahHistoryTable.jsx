import { useMemo } from 'react';
import Table from '../../ui/global/Table';
import { ATTENDANCE_RECAP_PAGE_SIZE } from '../../../utils/helpers/attendanceRecap';
import { getJamaahHistoryColumns } from '../../../features/attendance/JamaahHistoryColumns';

/**
 * Desktop history table. The hook returns only the current page, so numbering
 * reads from the pagination object.
 */
export default function JamaahHistoryTable({
  records = [],
  pagination,
  isLoading = false,
}) {
  const columns = useMemo(() => getJamaahHistoryColumns(), []);

  return (
    <Table
      columns={columns}
      data={records}
      rowKey="id"
      currentPage={pagination?.page ?? 1}
      itemsPerPage={pagination?.perPage ?? ATTENDANCE_RECAP_PAGE_SIZE}
      isLoading={isLoading}
      emptyMessage="Tidak ada riwayat pada filter ini."
      headerBgClass="bg-sea-green-500 text-white"
      stickyBgClass="bg-sea-green-500 text-white"
    />
  );
}
