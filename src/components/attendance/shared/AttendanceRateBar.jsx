import {
  getPercentageTone,
  PERCENTAGE_TONE,
} from '../../../utils/helpers/attendanceRecap';

const RATE_TONES = {
  [PERCENTAGE_TONE.SUCCESS]: {
    text: 'text-emerald-600',
    fill: 'bg-emerald-500',
  },
  [PERCENTAGE_TONE.WARNING]: {
    text: 'text-amber-600',
    fill: 'bg-amber-500',
  },
  [PERCENTAGE_TONE.DANGER]: {
    text: 'text-rose-600',
    fill: 'bg-rose-500',
  },
};

const clampPercentage = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.min(100, Math.max(0, Math.round(number)));
};

/**
 * Percentage label + progress bar shared by the recap table and mobile cards.
 * Accessible as a progressbar, and the tone follows `getPercentageTone`.
 */
export default function AttendanceRateBar({
  percentage = 0,
  present,
  absent,
  className = '',
}) {
  const value = clampPercentage(percentage);
  const tone = RATE_TONES[getPercentageTone(value)] ?? RATE_TONES.success;
  const total = Number(present ?? 0) + Number(absent ?? 0);

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className={`font-bold ${tone.text}`}>{value}%</span>
        <span className="text-slate-400">
          {present ?? 0} / {total}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`Persentase kehadiran ${value} persen`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${tone.fill}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
