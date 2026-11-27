import AttendancePagination from '../shared/AttendancePagination';
import {
  JamaahHistoryEmptyState,
  JamaahHistoryListSkeleton,
} from './JamaahHistoryState';
import JamaahHistoryCard from './JamaahHistoryCard';
import JamaahHistoryTable from './JamaahHistoryTable';

/**
 * History list wrapper: desktop table at md+, mobile cards below md, and the
 * shared pagination footer. Empty states live here so filters stay usable.
 */
export default function JamaahHistorySection({
  records = [],
  pagination,
  isLoading = false,
  isFilterActive = false,
  onResetFilters,
  onPageChange,
}) {
  if (!isLoading && records.length === 0) {
    return (
      <JamaahHistoryEmptyState
        isFilterActive={isFilterActive}
        onReset={onResetFilters}
      />
    );
  }

  const firstRowNumber = pagination?.from ?? 1;

  return (
    <section
      aria-label="Daftar riwayat kehadiran jamaah"
      className="flex flex-col gap-3"
    >
      <div className="hidden md:block">
        <JamaahHistoryTable
          records={records}
          pagination={pagination}
          isLoading={isLoading}
        />
      </div>

      <div className="md:hidden">
        {isLoading && records.length === 0 ? (
          <JamaahHistoryListSkeleton />
        ) : (
          <div className="flex flex-col gap-3">
            {records.map((record, index) => (
              <JamaahHistoryCard
                key={record.id}
                record={record}
                number={firstRowNumber + index}
              />
            ))}
          </div>
        )}
      </div>

      <AttendancePagination
        pagination={pagination}
        onPageChange={onPageChange}
        itemLabel="kegiatan"
      />
    </section>
  );
}
