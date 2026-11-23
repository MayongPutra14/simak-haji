import { useMemo, useState } from 'react';
import { useAuth } from '../../features/auth/useAuth';
import { useMyAttendance } from '../../hooks/user/useMyAttendance';
import { filterAttendanceRecords } from '../../utils/helpers/attendance';
import { ATTENDANCE_ALL_VALUE } from '../../utils/helpers/constant';
import {
  AttendanceErrorState,
  AttendanceFilterBar,
  AttendanceHistorySection,
  AttendanceRateCard,
  AttendanceSkeleton,
  AttendanceStatGrid,
} from '../../components/user/attendance/index';

const DEFAULT_FILTERS = {
  month: ATTENDANCE_ALL_VALUE,
  year: ATTENDANCE_ALL_VALUE,
  status: ATTENDANCE_ALL_VALUE,
};

export default function UserAttendacePage() {
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
      <main className="w-[95%] md:w-[98%] mx-auto pt-4 pb-6  md:pt-6">
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
          </>
        )}
      </main>
    </div>
  );
}
