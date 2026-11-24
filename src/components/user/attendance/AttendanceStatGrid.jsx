import { AttendanceStatCard } from '../../ui/global/HelperComponents';
import {
  IconCheckCircleFill,
  IconEventBusy,
  IconAlertCircle,
  IconTrendingUp,
} from '../../../utils/helpers/decorations';

/**
 * All-time present/absent totals. Filters never change these numbers
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
        icon={IconCheckCircleFill}
        hintIcon={IconTrendingUp}
      />
      <AttendanceStatCard
        tone="absent"
        label="Total Absen"
        value={stats.totalAbsent}
        unit="sesi"
        hint="Tidak Hadir"
        icon={IconEventBusy}
        hintIcon={IconAlertCircle}
      />
    </section>
  );
}
