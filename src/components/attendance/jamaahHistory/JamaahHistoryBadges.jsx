const ZONE_BADGE_BASE =
  'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-4';

/**
 * Event zone badge for the jamaah history table and mobile card.
 *
 * Displays the backend `eventRegionName` ('Wilayah B'). 'Umum' means the event
 * was open to every zone, so it gets a neutral tone instead of the zone tone.
 */
export function JamaahHistoryZoneBadge({ regionName, className = '' }) {
  const label = regionName || 'Umum';
  const isGeneral = label.toLowerCase() === 'umum';
  const toneClass = isGeneral
    ? 'border-emerald-200 bg-emerald-100 text-emerald-600'
    : 'border-yellow-200 bg-yellow-50 text-yellow-700';

  return (
    <span
      className={`${ZONE_BADGE_BASE} ${toneClass} ${className}`}
      title={`Zona kegiatan: ${label}`}
    >
      {label}
    </span>
  );
}
