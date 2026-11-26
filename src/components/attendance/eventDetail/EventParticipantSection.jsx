import AttendancePagination from '../shared/AttendancePagination';
import { AttendanceRecapListSkeleton } from '../shared/AttendanceRecapState';
import { EventParticipantEmptyState } from './EventParticipantState';
import EventParticipantCard from './EventParticipantCard';
import EventParticipantTable from './EventParticipantTable';

/**
 * Participant list wrapper: desktop table at md+, mobile cards below md, and
 * the shared pagination footer. Empty states live here so filters stay usable.
 */
export default function EventParticipantSection({
  participants = [],
  pagination,
  isLoading = false,
  isFilterActive = false,
  onResetFilters,
  onPageChange,
  fromPath = '',
}) {
  if (!isLoading && participants.length === 0) {
    return (
      <EventParticipantEmptyState
        isFilterActive={isFilterActive}
        onReset={onResetFilters}
      />
    );
  }

  const firstRowNumber = pagination?.from ?? 1;

  return (
    <section
      aria-label="Daftar peserta kehadiran kegiatan"
      className="flex flex-col gap-3"
    >
      <div className="hidden md:block">
        <EventParticipantTable
          participants={participants}
          pagination={pagination}
          isLoading={isLoading}
          fromPath={fromPath}
        />
      </div>

      <div className="md:hidden">
        {isLoading && participants.length === 0 ? (
          <AttendanceRecapListSkeleton />
        ) : (
          <div className="flex flex-col gap-3">
            {participants.map((participant, index) => (
              <EventParticipantCard
                key={participant.id}
                participant={participant}
                number={firstRowNumber + index}
                fromPath={fromPath}
              />
            ))}
          </div>
        )}
      </div>

      <AttendancePagination
        pagination={pagination}
        onPageChange={onPageChange}
        itemLabel="jamaah"
      />
    </section>
  );
}
