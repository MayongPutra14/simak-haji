import { ADMIN_DOC_FIELDS } from '../../../hooks/admin/user/useUsersFilter';
import { MdOutlineArrowDropDown as IconFilter } from 'react-icons/md';

export default function InlineFilterBar({
  zoneFilter,
  onZoneChange,
  yearFilter,
  onYearChange,
  docFilters,
  onDocFilterChange,
  uniqueZones = [],
  uniqueYears = [],
  isFilterActive,
  onClear,
}) {
  return (
    <div className="w-full p-3 border bg-slate-50/80 rounded-xl border-slate-100">
      <div className="flex items-center w-full gap-2 pb-1 overflow-x-auto flex-nowrap scrollbar-none custom-scrollbar-hide">
        {/* ZONA FILTER */}
        <div className="relative min-w-32 shrink-0">
          <select
            value={zoneFilter}
            onChange={(e) => onZoneChange(e.target.value)}
            className="w-full py-1.5 pl-3 pr-7 text-xs bg-white border border-slate-200 rounded-lg appearance-none cursor-pointer text-slate-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            {uniqueZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
            <IconFilter className="w-5 h-5" />
          </div>
        </div>

        {/* TAHUN FILTER */}
        <div className="relative min-w-32 shrink-0">
          <select
            value={yearFilter}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full py-1.5 pl-3 pr-7 text-xs bg-white border border-slate-200 rounded-lg appearance-none cursor-pointer text-slate-700 font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
            <IconFilter className="w-5 h-5" />
          </div>
        </div>

        {/* 11 DOCUMENTS STATUS FILTER */}
        {ADMIN_DOC_FIELDS.map(({ key, label }) => (
          <div key={key} className="relative min-w-28 shrink-0">
            <select
              value={docFilters[key]}
              onChange={(e) => onDocFilterChange(key, e.target.value)}
              className={`w-full py-1.5 pl-2.5 pr-6 text-xs border rounded-lg appearance-none cursor-pointer font-medium focus:outline-none transition-colors ${
                docFilters[key] !== 'Semua'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <option value="Semua">{label}: Semua</option>
              <option value="ok">{label}: OK</option>
              <option value="menunggu">{label}: Menunggu</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
              <IconFilter className="w-5 h-5" />
            </div>
          </div>
        ))}

        {/* RESET BUTTON */}
        {isFilterActive && (
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 shrink-0 transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
}
