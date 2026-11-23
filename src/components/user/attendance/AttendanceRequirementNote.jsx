import { MdVerified } from 'react-icons/md';
import { ATTENDANCE_MIN_PERCENTAGE } from '../../../utils/helpers/attendance';

/**
 * Static Istitha'ah reminder shown under the history list.
 */
export default function AttendanceRequirementNote({ className = '' }) {
  return (
    <aside
      className={`flex items-center gap-3 rounded-2xl border border-sea-green-200/60 bg-linear-to-r from-sea-green-50 via-teal-50/70 to-sea-green-50/60 p-3 shadow-sm ${className}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sea-green-200 bg-sea-green-100/90">
        <MdVerified className="h-5 w-5 text-sea-green-700" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold text-sea-green-900">
          Persyaratan Kehadiran Istitha&apos;ah
        </p>
        <p className="text-xs leading-5 text-slate-600">
          Kehadiran minimal {ATTENDANCE_MIN_PERCENTAGE}% diperlukan untuk
          penerbitan surat rekomendasi keberangkatan Kemenag Karawang.
        </p>
      </div>
    </aside>
  );
}
