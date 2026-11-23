function SkeletonBlock({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`} />
  );
}

/**
 * Loading placeholders that mirror the real layout (stats, rate card, filters, list).
 */
export default function AttendanceSkeleton() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <SkeletonBlock className="h-28 rounded-2xl" />
        <SkeletonBlock className="h-28 rounded-2xl" />
      </div>

      <SkeletonBlock className="h-32 rounded-2xl" />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <SkeletonBlock className="h-10" />
        <SkeletonBlock className="h-10" />
        <SkeletonBlock className="h-10" />
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-20 rounded-2xl" />
        <SkeletonBlock className="h-20 rounded-2xl" />
        <SkeletonBlock className="h-20 rounded-2xl" />
      </div>

      <span className="sr-only">Memuat riwayat absensi...</span>
    </div>
  );
}
