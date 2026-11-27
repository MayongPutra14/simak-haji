import {
  IconAlertCircle,
  IconHistory,
  IconRefresh,
} from '../../../utils/helpers/decorations';

function SkeletonBlock({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`}
    />
  );
}

/**
 * First-load placeholder for the jamaah history page. Mirrors the real layout:
 * identity card, exactly two stat cards, filter bar and history rows.
 */
export function JamaahHistoryLoadingState() {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      <SkeletonBlock className="h-24 rounded-2xl" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1].map((item) => (
          <SkeletonBlock key={item} className="h-32 rounded-2xl" />
        ))}
      </div>

      <SkeletonBlock className="h-20 rounded-2xl" />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        <SkeletonBlock className="h-12 rounded-none" />

        {[0, 1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="border-t border-slate-100 px-4 py-4"
            aria-hidden="true"
          >
            <SkeletonBlock className="h-8 rounded-lg" />
          </div>
        ))}
      </div>

      <span className="sr-only">Memuat riwayat kehadiran jamaah...</span>
    </div>
  );
}

/**
 * Inline list placeholder used on mobile while a filter change is loading.
 */
export function JamaahHistoryListSkeleton({ rows = 3 }) {
  return (
    <div role="status" aria-live="polite" className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonBlock key={index} className="h-32 rounded-2xl" />
      ))}

      <span className="sr-only">Memuat daftar riwayat kehadiran...</span>
    </div>
  );
}

/**
 * Shown when the jamaah has no history in scope or the filters match nothing.
 * The reset action only appears when a filter is actually active.
 */
export function JamaahHistoryEmptyState({ isFilterActive, onReset }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-12 text-center"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-600">
        <IconHistory className="h-8 w-8" aria-hidden="true" />
      </div>

      <h2 className="text-sm font-bold text-slate-700">
        Belum Ada Riwayat Absensi
      </h2>

      <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
        {isFilterActive
          ? 'Tidak ada kegiatan yang cocok dengan pencarian atau filter yang dipilih. Coba atur ulang filter.'
          : 'Riwayat akan muncul di sini setelah jamaah mengikuti kegiatan yang telah selesai.'}
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

/**
 * Failure state for session, scope, or request errors. Retry is hidden when
 * the caller knows retrying cannot help (e.g. a leader without a zone).
 */
export function JamaahHistoryErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-rose-200/70 bg-rose-50/60 px-4 py-12 text-center"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        <IconAlertCircle className="h-8 w-8" aria-hidden="true" />
      </div>

      <h2 className="text-sm font-bold text-rose-800">
        Gagal Memuat Riwayat Kehadiran
      </h2>

      <p className="mt-1 max-w-sm text-xs leading-5 text-rose-700/80">
        {message ||
          'Terjadi kesalahan saat mengambil riwayat kehadiran jamaah.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          <IconRefresh className="h-4 w-4" aria-hidden="true" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}
