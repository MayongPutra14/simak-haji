import { ATTENDANCE_STATUS_OPTIONS } from '../../../utils/helpers/constant';
import {
  IconFilter,
  IcontFilterList,
} from '../../../utils/helpers/decorations';

function FilterSelect({ id, label, value, options, onChange }) {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200/90 bg-white py-2.5 pl-3 pr-8 text-xs text-slate-700 shadow-sm transition-all hover:border-sea-green-300 focus:border-sea-green-400 focus:outline-none focus:ring-1 focus:ring-sea-green-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <IconFilter
        className="pointer-events-none absolute right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}

export default function AttendanceFilterBar({ filters, options, onChange }) {
  return (
    <section aria-label="Filter riwayat kehadiran" className="mb-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <IcontFilterList
            className="h-5 w-5 text-slate-700"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold text-slate-700">
            Filter Riwayat:
          </span>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-3">
          <FilterSelect
            id="attendance-month-filter"
            label="Filter bulan"
            value={filters.month}
            options={options.months}
            onChange={(value) => onChange('month', value)}
          />

          <FilterSelect
            id="attendance-year-filter"
            label="Filter tahun"
            value={filters.year}
            options={options.years}
            onChange={(value) => onChange('year', value)}
          />

          <FilterSelect
            id="attendance-status-filter"
            label="Filter status kehadiran"
            value={filters.status}
            options={ATTENDANCE_STATUS_OPTIONS}
            onChange={(value) => onChange('status', value)}
          />
        </div>
      </div>
    </section>
  );
}
