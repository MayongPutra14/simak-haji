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
}) {
  return (
    <section
      aria-label="Pencarian dan filter rekap kehadiran"
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

        {/* FILTER BAR WRAPPER (AUTO-WIDTH TO PREVENT UNNECESSARY SCROLL) */}
        <div className="w-full lg:w-auto lg:shrink-0">
          <InlineFilterBar
            filters={filterConfigs}
            isFilterActive={isFilterActive}
            onClear={onClearFilters}
          />
        </div>
      </div>
    </section>
  );
}
