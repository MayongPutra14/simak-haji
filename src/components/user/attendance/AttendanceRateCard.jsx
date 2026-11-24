import { ATTENDANCE_MIN_PERCENTAGE } from '../../../utils/helpers/constant';
import { IconInsights } from '../../../utils/helpers/decorations';

const RING_RADIUS = 19;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// CIRCULAR PROGRESS RING
function AttendanceRing({ percentage, isEligible }) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const dashOffset =
    RING_CIRCUMFERENCE - (safePercentage / 100) * RING_CIRCUMFERENCE;

  return (
    <div
      role="img"
      aria-label={`Tingkat kehadiran ${safePercentage} persen`}
      className="relative flex h-14 w-14 shrink-0 items-center justify-center"
    >
      <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90">
        {/* ring track */}
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          className="text-white/30"
        />
        {/* ring progress */}
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className={`transition-[stroke-dashoffset] duration-700 ${
            isEligible ? 'text-emerald-800' : 'text-rose-800'
          }`}
        />
      </svg>
      <span className="absolute text-sm font-bold text-white">
        {safePercentage}%
      </span>
    </div>
  );
}

// ATTENDANCE RATE CARD
export default function AttendanceRateCard({ stats }) {
  const {
    percentage,
    totalRecords,
    minimumPercentage = ATTENDANCE_MIN_PERCENTAGE,
    isEligible,
  } = stats;

  const requirementCopy = isEligible
    ? `${percentage}% Memenuhi Syarat Minimal (${minimumPercentage}%)`
    : `${percentage}% dari syarat minimal ${minimumPercentage}%`;

  return (
    <section
      aria-label="Tingkat kehadiran"
      className={`mb-4 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
        isEligible
          ? 'border-emerald-300 bg-linear-to-r from-emerald-500 to-teal-400'
          : 'border-rose-300 bg-linear-to-r from-rose-500 to-orange-400'
      }`}
    >
      {/* CARD HEADER */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* icon wrapper */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20">
            <IconInsights className="h-5 w-5 text-white" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white">Tingkat Kehadiran</h2>
            <p className="text-xs text-white/90">
              Dari total akumulasi {totalRecords} agenda wajib
            </p>
          </div>
        </div>

        <AttendanceRing percentage={percentage} isEligible={isEligible} />
      </div>

      {/* LINEAR PROGRESS BAR */}
      <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-white/90 p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isEligible
              ? 'bg-linear-to-r from-emerald-700 to-teal-600'
              : 'bg-linear-to-r from-rose-700 to-orange-600'
          }`}
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        />
      </div>

      {/* CARD FOOTER & STATUS BADGE */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-white">
          <span
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/60 ${
              isEligible ? 'bg-emerald-700' : 'bg-rose-700'
            }`}
          />
          {requirementCopy}
        </span>

        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
            isEligible
              ? 'border-emerald-200/60 bg-emerald-50 text-emerald-800'
              : 'border-rose-200/60 bg-rose-50 text-rose-800'
          }`}
        >
          {isEligible ? 'Status Aman' : 'Belum Memenuhi'}
        </span>
      </div>
    </section>
  );
}
