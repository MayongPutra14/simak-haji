import { EVENT_FILTER_TABS } from '../../utils/helpers/constant';
import {
  IconSearch,
  IconClose,
} from '../../utils/helpers/decorations';

export default function UserEventFilterBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  isFilterActive,
  onReset,
}) {
  return (
    <div className="w-full p-3 border bg-slate-50/80 rounded-xl border-slate-100 space-y-3">
      {/* Row 1: Top Search Bar */}
      <div className="relative w-full">
        {/* Search Icon (SVG so you don't need extra icon imports) */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          <IconSearch className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama acara, lokasi, atau pemateri..."
          className="w-full py-2.5 pl-10 pr-9 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />

        {/* Quick clear 'X' button inside input when text exists */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Hapus pencarian"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <IconClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Row 2: Navigation-Style Tab Buttons + Conditional Reset Button */}
      <div className="flex items-center w-full gap-2 py-1 px-1 -mx-1 overflow-x-auto flex-nowrap scrollbar-none custom-scrollbar-hide">
        {EVENT_FILTER_TABS.map((tab) => {
          const isSelected = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`px-4 py-2 text-xs font-semibold border rounded-xl shrink-0 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                isSelected
                  ? 'bg-emerald-600 border-emerald-600 text-white ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Reset button appears at the end of the tab row when a filter/search is active */}
        {isFilterActive && (
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );
}
