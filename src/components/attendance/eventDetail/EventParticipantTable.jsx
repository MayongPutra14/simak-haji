import { useMemo } from 'react';
import Table from '../../ui/global/Table';
import { ATTENDANCE_RECAP_PAGE_SIZE } from '../../../utils/helpers/attendanceRecap';
import { getEventParticipantColumns } from '../../../features/attendance/EventParticipantColumns';

/**
 * Desktop participant table. The hook returns only the current page, so
 * numbering reads from the pagination object.
 */
export default function EventParticipantTable({
  participants = [],
  pagination,
  isLoading = false,
  fromPath = '',
}) {
  const columns = useMemo(
    () => getEventParticipantColumns({ fromPath }),
    [fromPath],
  );

  return (
    <Table
      columns={columns}
      data={participants}
      rowKey="id"
      currentPage={pagination?.page ?? 1}
      itemsPerPage={pagination?.perPage ?? ATTENDANCE_RECAP_PAGE_SIZE}
      isLoading={isLoading}
      emptyMessage="Tidak ada jamaah pada filter ini."
      headerBgClass="bg-sea-green-500 text-white"
      stickyBgClass="bg-sea-green-500 text-white"
    />
  );
}
