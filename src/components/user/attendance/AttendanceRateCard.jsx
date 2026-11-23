import { ATTENDANCE_MIN_PERCENTAGE } from '../../../utils/helpers/constant';
import { IconInsights } from '../../../utils/helpers/decorations';

const RING_RADIUS = 19;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function AttendanceRing({ percentage }) {
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
        <circle
          cx="24"
          cy="24"
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          className="text-slate-100"
        />
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
          className="text-sea-green-600 transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="absolute text-sm font-bold text-white">
        {safePercentage}%
      </span>
    </div>
  );
}

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
      className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-300 p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-50 bg-emerald-50/60">
            <IconInsights className="h-5 w-5 text-white" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white">Tingkat Kehadiran</h2>
            <p className="text-xs text-white">
              Dari total akumulasi {totalRecords} agenda wajib
            </p>
          </div>
        </div>

        <AttendanceRing percentage={percentage} />
      </div>

      <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-white">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isEligible
              ? 'bg-linear-to-r from-sea-green-500 to-teal-400'
              : 'bg-linear-to-r from-rose-400 to-orange-300'
          }`}
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-white">
          <span
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
              isEligible ? 'bg-sea-green-500' : 'bg-rose-400'
            }`}
          />
          {requirementCopy}
        </span>

        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
            isEligible
              ? 'border-sea-green-200/60 bg-sea-green-50 text-sea-green-700'
              : 'border-rose-200/60 bg-rose-50 text-rose-700'
          }`}
        >
          {isEligible ? 'Status Aman' : 'Belum Memenuhi'}
        </span>
      </div>
    </section>
  );
}
