/**
 * Accessible status toggle group with optional counts.
 *
 * `options` shape: { value, label, count }. The active option exposes
 * `aria-pressed="true"` instead of relying on color alone.
 */
export default function AttendanceStatusTabs({
  options = [],
  value,
  onChange,
  label = 'Filter status kehadiran',
  className = '',
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {options.map((option) => {
        const isActive = String(option.value) === String(value);
        const hasCount = option.count !== undefined && option.count !== null;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
              isActive
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {option.label}

            {hasCount && (
              <span
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
