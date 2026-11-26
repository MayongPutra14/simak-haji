import { IconLocation } from '../../../utils/helpers/decorations';

/**
 * Compact identity card for the jamaah history page.
 *
 * Intentionally shows only the name and zone (plus the initials avatar). This
 * page is an attendance log, not a profile, so documents, contact details and
 * verification badges are not duplicated here.
 */
export default function JamaahHistoryIdentity({ jamaah }) {
  const zoneLabel = jamaah?.zone
    ? `Zona ${jamaah.zone}`
    : jamaah?.regionName || '-';

  return (
    <section
      aria-label="Identitas jamaah"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:p-6"
    >
      <div className="flex flex-col">
        <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 md:text-xl">
          {jamaah?.fullName || '-'}
        </h2>

        <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <IconLocation
            className="h-4 w-4 shrink-0 text-emerald-700"
            aria-hidden="true"
          />
          {zoneLabel}
        </p>
      </div>
    </section>
  );
}
