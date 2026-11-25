import SeacrhInput from '../../ui/inputs/SeacrhInput';
import InlineFilterBar from '../../ui/global/InlineFilterBar';

/**
 * Recap toolbar: name search, derived Bulan/Tahun filters and the static
 * "Selesai" status chip. The status is fixed because only completed events
 * belong in the recap (PRD 5.2).
 */
export default function AttendanceRecapFilters({
  search,
  filterConfigs,
  isFilterActive,
  onSearchChange,
  onClearFilters,
  completedCount = 0,
}) {
  return (
    <section
      aria-label="Pencarian dan filter rekap kehadiran"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <SeacrhInput
            placeHolder="Cari nama kegiatan..."
            searchQuery={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="w-full lg:w-auto lg:min-w-80">
          <InlineFilterBar
            filters={filterConfigs}
            isFilterActive={isFilterActive}
            onClear={onClearFilters}
          />
        </div>

        <div className="flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-4 text-xs text-emerald-900 sm:text-sm">
          <span className="text-xs font-medium text-slate-500">Status:</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Selesai ({completedCount})
          </span>
        </div>
      </div>
    </section>
  );
}
