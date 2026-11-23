import AttendanceEmptyState from './AttendanceState';
import AttendanceHistoryCard from './AttendanceHistoryCard';
import AttendanceHistoryTable from './AttendanceHistoryTable';

/**
 * History wrapper: heading, visible session count and the responsive switch
 * between desktop table (md+) and mobile cards (< md).
 */
export default function AttendanceHistorySection({
  records,
  isFilterActive,
  onReset,
}) {
  return (
    <section
      aria-label="Daftar riwayat absensi"
      className="flex flex-col gap-2"
    >
      {records.length === 0 ? (
        <AttendanceEmptyState
          isFilterActive={isFilterActive}
          onReset={onReset}
        />
      ) : (
        <>
          <AttendanceHistoryTable records={records} />

          <div className="flex flex-col gap-2 md:hidden">
            {records.map((record) => (
              <AttendanceHistoryCard key={record.id} record={record} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
