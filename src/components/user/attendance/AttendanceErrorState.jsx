import { MdRefresh, MdErrorOutline } from 'react-icons/md';

/**
 * Failed request state with a retry action wired to `refetch()`.
 */
export default function AttendanceErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200/70 bg-rose-50/60 px-4 py-12 text-center">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
        <MdErrorOutline className="h-8 w-8" aria-hidden="true" />
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
        <MdRefresh className="h-4 w-4" aria-hidden="true" />
        Coba Lagi
      </button>
    </div>
  );
}
