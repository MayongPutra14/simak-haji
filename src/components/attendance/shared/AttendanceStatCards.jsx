import { AttendanceStatCard } from '../../ui/global/HelperComponents';

const GRID_BY_COUNT = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
};

/**
 * Config-driven attendance statistic cards.
 *
 * `items` shape: { id, label, value, unit, hint, tone, icon, hintIcon }.
 * The tone maps to the shared `CARD_TONES` palette in helpers/constant.js, so
 * 2, 3 or 4 cards always share the same visual language.
 */
export default function AttendanceStatCards({
  items = [],
  ariaLabel = 'Statistik kehadiran',
  className = '',
}) {
  const gridClass =
    GRID_BY_COUNT[items.length] ?? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section
      aria-label={ariaLabel}
      className={`grid gap-4 ${gridClass} ${className}`}
    >
      {items.map((item) => (
        <AttendanceStatCard
          key={item.id}
          tone={item.tone}
          label={item.label}
          value={item.value}
          unit={item.unit}
          hint={item.hint}
          icon={item.icon}
          hintIcon={item.hintIcon}
        />
      ))}
    </section>
  );
}
