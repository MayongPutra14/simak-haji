import { useMemo, useState } from 'react';
import { useAuth } from '../../features/auth/useAuth';
import { useMyAttendance } from '../../hooks/user/useMyAttendance';
import {
  ATTENDANCE_ALL_VALUE,
  filterAttendanceRecords,
} from '../../utils/helpers/attendance';
import AttendanceErrorState from '../../components/user/attendance/AttendanceErrorState';
import AttendanceFilterBar from '../../components/user/attendance/AttendanceFilterBar';
import AttendanceHistorySection from '../../components/user/attendance/AttendanceHistorySection';
import AttendancePageHeader from '../../components/user/attendance/AttendancePageHeader';
import AttendanceRateCard from '../../components/user/attendance/AttendanceRateCard';
import AttendanceRequirementNote from '../../components/user/attendance/AttendanceRequirementNote';
import AttendanceSkeleton from '../../components/user/attendance/AttendanceSkeleton';
import AttendanceStatGrid from '../../components/user/attendance/AttendanceStatGrid';
import JamaahPersonaCard from '../../components/user/attendance/JamaahPersonaCard';

const DEFAULT_FILTERS = {
  month: ATTENDANCE_ALL_VALUE,
  year: ATTENDANCE_ALL_VALUE,
  status: ATTENDANCE_ALL_VALUE,
};

/**
 * Jamaah "Absensi Saya" page (PRD 4.4).
 *
 * Standalone route `/absensi-saya` — intentionally outside `UserLayout` so it can
 * use the mobile-first header from the mockup. Data is restricted to the logged-in
 * user: the hook only receives `user.id` and never a client-supplied id.
 */
export default function AbsensiSayaPage() {
  const { user } = useAuth();
  const { records, stats, filterOptions, isLoading, error, refetch } =
    useMyAttendance(user?.id);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredRecords = useMemo(
    () => filterAttendanceRecords(records, filters),
    [records, filters],
  );

  const isFilterActive = Object.values(filters).some(
    (value) => value !== ATTENDANCE_ALL_VALUE,
  );

  const handleFilterChange = (key, value) =>
    setFilters((previous) => ({ ...previous, [key]: value }));

  const handleResetFilters = () => setFilters(DEFAULT_FILTERS);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <AttendancePageHeader user={user} />

      <main className="mx-auto w-full max-w-4xl px-4 pt-4 md:px-6 md:pt-6">
        <JamaahPersonaCard user={user} />

        <p className="mb-4 text-sm leading-6 text-slate-600">
          Pantau riwayat dan statistik kehadiran Anda dalam setiap kegiatan
          pembinaan, manasik, dan agenda SIMAK Karawang.
        </p>

        {isLoading ? (
          <AttendanceSkeleton />
        ) : error ? (
          <AttendanceErrorState message={error} onRetry={refetch} />
        ) : (
          <>
            <AttendanceStatGrid stats={stats} />
            <AttendanceRateCard stats={stats} />
            <AttendanceFilterBar
              filters={filters}
              options={filterOptions}
              onChange={handleFilterChange}
            />
            <AttendanceHistorySection
              records={filteredRecords}
              isFilterActive={isFilterActive}
              onReset={handleResetFilters}
            />
            <AttendanceRequirementNote className="mt-4" />
          </>
        )}
      </main>
    </div>
  );
}
