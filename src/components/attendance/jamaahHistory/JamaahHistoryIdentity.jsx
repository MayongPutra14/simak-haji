import AttendanceAvatar from '../shared/AttendanceAvatar';
import { IconLocation, IconIdCard } from '../../../utils/helpers/decorations';
import { titleCase } from '../../../utils/helpers/helpers';

/**
 * Compact identity card for the jamaah history page.
 *
 * Intentionally shows only the photo, name, zone, and portion number. This page
 * is an attendance log, not a profile, so documents, contact details and
 * verification badges are not duplicated here.
 */
export default function JamaahHistoryIdentity({ jamaah }) {
  const zoneLabel = jamaah?.zone
    ? `Zona ${jamaah.zone}`
    : jamaah?.regionName || '-';
  const portionNumber = jamaah?.portionNumber || '-';

  return (
    <section
      aria-label="Identitas jamaah"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:p-6"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <AttendanceAvatar
          photoUrl={jamaah?.photoUrl}
          fullName={jamaah?.fullName}
          className="w-24 aspect-3/4 lg:w-36 rounded-2xl border-4 border-sea-green-400/30 shadow-md"
          textClassName="text-xl lg:text-2xl"
        />

        <div className="min-w-0 flex flex-col flex-1">
          <h2 className="truncate text-lg font-bold text-slate-900 md:text-xl">
            {titleCase(jamaah?.fullName || '-')}
          </h2>

          <div className="mt-1 flex items-center gap-x-3 gap-y-1.5 text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <IconIdCard
                className="h-4 w-4 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              {portionNumber}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <IconLocation
                className="h-4 w-4 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              {zoneLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
