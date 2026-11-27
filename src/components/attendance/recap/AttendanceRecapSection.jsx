import AttendancePagination from '../shared/AttendancePagination';
import {
  AttendanceRecapEmptyState,
  AttendanceRecapListSkeleton,
} from '../shared/AttendanceRecapState';
import AttendanceRecapCard from './AttendanceRecapCard';
import AttendanceRecapTable from './AttendanceRecapTable';

/**
 * Recap list wrapper: desktop table at md+, mobile cards below md, and the
 * shared pagination footer. Empty states live here so the filters stay usable.
 */
export default function AttendanceRecapSection({
  events = [],
  pagination,
  isLoading = false,
  isFilterActive = false,
  onResetFilters,
  onPageChange,
}) {
  if (!isLoading && events.length === 0) {
    return (
      <AttendanceRecapEmptyState
        isFilterActive={isFilterActive}
        onReset={onResetFilters}
      />
    );
  }

  const firstRowNumber = pagination?.from ?? 1;

  return (
    <section
      aria-label="Daftar rekap kehadiran kegiatan"
      className="flex flex-col gap-3"
    >
      <div className="hidden md:block">
        <AttendanceRecapTable
          events={events}
          pagination={pagination}
          isLoading={isLoading}
        />
      </div>

      <div className="md:hidden">
        {isLoading && events.length === 0 ? (
          <AttendanceRecapListSkeleton />
        ) : (
          <div className="flex flex-col gap-3">
            {events.map((event, index) => (
              <AttendanceRecapCard
                key={event.id}
                event={event}
                number={firstRowNumber + index}
              />
            ))}
          </div>
        )}
      </div>

      <AttendancePagination
        pagination={pagination}
        onPageChange={onPageChange}
        itemLabel="kegiatan selesai"
      />
    </section>
  );
}
