import { MdMosque } from 'react-icons/md';
import { titleCase } from '../../../utils/helpers/helpers';

/**
 * Identity banner above the statistics. Only uses fields that exist in the auth
 * session (`fullName`, `batch`, `portionNumber`, `zone`) — no unbacked badges.
 */
export default function JamaahPersonaCard({ user }) {
  const name = titleCase(user?.fullName);
  const portion = user?.portionNumber
    ? `No. Porsi: ${user.portionNumber}`
    : 'No. Porsi: -';
  const zone = user?.zone ? `Zona ${titleCase(user.zone)}` : 'Zona -';

  return (
    <section
      aria-label="Identitas jamaah"
      className="mb-4 rounded-2xl border border-sea-green-200/60 bg-white p-4 shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sea-green-200/60 bg-sea-green-100/80">
          <MdMosque className="h-6 w-6 text-sea-green-700" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sea-green-800">
              Jamaah SIMAK
            </span>

            {user?.batch && (
              <span className="rounded-full border border-galliano-200 bg-galliano-50 px-2 py-0.5 text-[10px] font-semibold text-galliano-800">
                Kloter {user.batch}
              </span>
            )}
          </div>

          <h2 className="mt-0.5 truncate text-base font-bold text-slate-800">
            {name || 'Nama belum diisi'}
          </h2>

          <p className="truncate text-xs text-slate-500">
            {portion}
            <span className="mx-1.5 text-slate-300">•</span>
            {zone}
          </p>
        </div>
      </div>
    </section>
  );
}
