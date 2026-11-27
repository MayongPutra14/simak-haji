import SeacrhInput from '../../ui/inputs/SeacrhInput';
import InlineFilterBar from '../../ui/global/InlineFilterBar';
import AttendanceStatusTabs from '../shared/AttendanceStatusTabs';

/**
 * History toolbar: event-name search, derived Bulan filter, and status tabs
 * with all-time counts. Counts come from the stats block so they never shrink
 * with the active filters.
 */
export default function JamaahHistoryFilters({
  search,
  status,
  statusOptions,
  monthFilterConfigs,
  isFilterActive,
  onSearchChange,
  onStatusChange,
  onClearFilters,
}) {
  return (
    <section
      aria-label="Pencarian dan filter riwayat kehadiran jamaah"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* SEARCH INPUT WRAPPER */}
        <div className="min-w-0 flex-1">
          <SeacrhInput
            placeHolder="Cari nama kegiatan..."
            searchQuery={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        {/* MONTH FILTER + STATUS TABS */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="w-full sm:w-auto sm:min-w-44">
            <InlineFilterBar
              filters={monthFilterConfigs}
              isFilterActive={isFilterActive}
              onClear={onClearFilters}
            />
          </div>

          <AttendanceStatusTabs
            options={statusOptions}
            value={status}
            onChange={onStatusChange}
          />
        </div>
      </div>
    </section>
  );
}
