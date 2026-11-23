import AttendanceEmptyState from './AttendanceEmptyState';
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
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Riwayat Absensi
          </h2>
          <p className="text-xs text-slate-500">
            Berikut adalah riwayat kehadiran Anda dalam kegiatan SIMAK.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-sea-green-100/60 px-2 py-0.5 text-[10px] font-semibold text-sea-green-700">
          {records.length} Sesi
        </span>
      </div>

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
