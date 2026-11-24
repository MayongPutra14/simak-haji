import {
  IconAlertCircle,
  IconCalendarMonth,
  IconRefresh,
} from '../../../utils/helpers/decorations';
import { AttendanceSkeleton } from '../../ui/global/skeletons/SkeletonLoading';

/**
 * Loading placeholder for the first request. Reuses the global attendance skeleton
 * so the real layout (stats, rate card, filters, list) is mirrored while it loads.
 */
export function AttendanceLoadingState() {
  return (
    <div role="status" aria-live="polite">
      <AttendanceSkeleton />
    </div>
  );
}

/**
 * Shown when the filtered history is empty. With real data this covers two cases:
 * a congregant with no completed events yet, and a filter combination with no match.
 * The reset action only appears when a filter is actually active, so the button
 * never does nothing.
 */
export function AttendanceEmptyState({ isFilterActive, onReset }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-12 text-center"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-sea-green-100/70 text-sea-green-600">
        <IconCalendarMonth className="h-8 w-8" aria-hidden="true" />
      </div>

      <h3 className="text-sm font-bold text-slate-700">
        Belum Ada Riwayat Absensi
      </h3>

      <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
        {isFilterActive
          ? 'Tidak ada riwayat kehadiran yang cocok dengan filter yang dipilih. Coba atur ulang filter.'
          : 'Riwayat kehadiran Anda akan muncul di sini setelah mengikuti kegiatan SIMAK Karawang.'}
      </p>

      {isFilterActive && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-sea-green-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-sea-green-800 focus:outline-none focus:ring-2 focus:ring-sea-green-300"
        >
          <IconRefresh className="h-4 w-4" aria-hidden="true" />
          Atur Ulang Filter
        </button>
      )}
    </div>
  );
}

export function AttendanceErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-rose-200/70 bg-rose-50/60 px-4 py-12 text-center"
    >
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        <IconAlertCircle className="h-8 w-8" aria-hidden="true" />
      </div>

      <h3 className="text-sm font-bold text-rose-800">
        Gagal Memuat Riwayat Absensi
      </h3>

      <p className="mt-1 max-w-xs text-xs leading-5 text-rose-700/80">
        {message || 'Terjadi kesalahan saat mengambil data kehadiran Anda.'}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
      >
        <IconRefresh className="h-4 w-4" aria-hidden="true" />
        Coba Lagi
      </button>
    </div>
  );
}
