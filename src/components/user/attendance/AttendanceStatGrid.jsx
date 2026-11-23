import {
  MdCheckCircle,
  MdEventBusy,
  MdInfoOutline,
  MdTrendingUp,
} from 'react-icons/md';

const CARD_TONES = {
  present: {
    card: 'border-sea-green-200 bg-linear-to-br from-sea-green-50 to-teal-50/60',
    label: 'text-sea-green-800',
    value: 'text-sea-green-700',
    iconWrap: 'border-sea-green-200/60 bg-sea-green-100/90 text-sea-green-700',
    hint: 'text-sea-green-700',
    hintIcon: 'text-sea-green-600',
  },
  absent: {
    card: 'border-rose-200/60 bg-linear-to-br from-rose-50 to-orange-50/40',
    label: 'text-rose-800',
    value: 'text-rose-600',
    iconWrap: 'border-rose-200/60 bg-rose-100/90 text-rose-600',
    hint: 'text-rose-700',
    hintIcon: 'text-rose-500',
  },
};

function AttendanceStatCard({
  label,
  value,
  unit,
  hint,
  tone,
  icon: Icon,
  hintIcon: HintIcon,
}) {
  const style = CARD_TONES[tone] ?? CARD_TONES.present;

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md ${style.card}`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={`text-xs font-semibold ${style.label}`}>{label}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${style.iconWrap}`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl font-bold ${style.value}`}>{value}</span>
        <span className="text-xs text-slate-500">{unit}</span>
      </div>

      <div className="mt-1 flex items-center gap-1.5">
        <HintIcon
          className={`h-3.5 w-3.5 shrink-0 ${style.hintIcon}`}
          aria-hidden="true"
        />
        <span className={`text-[10px] font-medium ${style.hint}`}>{hint}</span>
      </div>
    </div>
  );
}

/**
 * All-time present/absent totals. Filters never change these numbers (Phase 1 decision).
 */
export default function AttendanceStatGrid({ stats }) {
  return (
    <section
      aria-label="Statistik kehadiran"
      className="mb-3 grid grid-cols-2 gap-3"
    >
      <AttendanceStatCard
        tone="present"
        label="Total Hadir"
        value={stats.totalPresent}
        unit="kegiatan"
        hint="Tercatat Hadir"
        icon={MdCheckCircle}
        hintIcon={MdTrendingUp}
      />
      <AttendanceStatCard
        tone="absent"
        label="Total Absen"
        value={stats.totalAbsent}
        unit="sesi"
        hint="Tidak Hadir"
        icon={MdEventBusy}
        hintIcon={MdInfoOutline}
      />
    </section>
  );
}
