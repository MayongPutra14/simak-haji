import { IconPeople, IconRefresh } from '../../../utils/helpers/decorations';

/**
 * Empty state for the event participant list. It distinguishes between an
 * event with no registered jamaah and a filter combination with no matches.
 */
export function EventParticipantEmptyState({ isFilterActive, onReset }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-12 text-center"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-600">
        <IconPeople className="h-8 w-8" aria-hidden="true" />
      </div>

      <h2 className="text-sm font-bold text-slate-700">
        Jamaah Tidak Ditemukan
      </h2>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
        {isFilterActive
          ? 'Tidak ada jamaah yang cocok dengan pencarian atau filter yang dipilih. Coba atur ulang filter.'
          : 'Belum ada jamaah yang terdaftar pada kegiatan ini.'}
      </p>

      {isFilterActive && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <IconRefresh className="h-4 w-4" aria-hidden="true" />
          Atur Ulang Filter
        </button>
      )}
    </div>
  );
}
