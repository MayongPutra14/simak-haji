import { useCallback, useMemo, useState } from 'react';
import { useAuth } from '../../features/auth/useAuth';
import { useAttendanceRecap } from '../../hooks/attendance/useAttendanceRecap';
import BackButton from '../../components/ui/global/BackButton';
import { ATTENDANCE_ALL_VALUE } from '../../utils/helpers/constant';
import {
  ATTENDANCE_RECAP_PAGE_SIZE,
  resolveAttendanceScope,
} from '../../utils/helpers/attendanceRecap';
import {
  AttendanceRecapErrorState,
  AttendanceRecapFilters,
  AttendanceRecapLoadingState,
  AttendanceRecapSection,
  AttendanceStatCards,
} from '../../components/attendance/index';
import {
  IconAlertCircle,
  IconCalendar,
  IconCheckCircle,
  IconCheckCircleFill,
  IconEventBusy,
  IconInsights,
  IconPeople,
  IconTrendingUp,
} from '../../utils/helpers/decorations';

const DEFAULT_FILTERS = {
  search: '',
  month: ATTENDANCE_ALL_VALUE,
  year: ATTENDANCE_ALL_VALUE,
  zone: ATTENDANCE_ALL_VALUE,
};

export default function AttendanceRecapPage() {
  const { user } = useAuth();
  const scope = useMemo(() => resolveAttendanceScope(user), [user]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const {
    events,
    stats,
    filterOptions,
    pagination,
    isLoading,
    error,
    refetch,
  } = useAttendanceRecap({
    scope,
    search: filters.search,
    month: filters.month,
    year: filters.year,
    zone: scope.isZoneLocked ? ATTENDANCE_ALL_VALUE : filters.zone,
    page,
    perPage: ATTENDANCE_RECAP_PAGE_SIZE,
  });

  const isFilterActive =
    filters.search.trim() !== '' ||
    filters.month !== ATTENDANCE_ALL_VALUE ||
    filters.year !== ATTENDANCE_ALL_VALUE;

  const handleFilterChange = useCallback((key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage) => setPage(nextPage), []);

  const filterConfigs = useMemo(
    () => [
      {
        key: 'month',
        value: filters.month,
        onChange: (value) => handleFilterChange('month', value),
        options: filterOptions.months,
      },
      {
        key: 'year',
        value: filters.year,
        onChange: (value) => handleFilterChange('year', value),
        options: filterOptions.years,
      },
    ],
    [filters.month, filters.year, filterOptions, handleFilterChange],
  );

  const statCards = useMemo(
    () => [
      {
        id: 'total-events',
        label: 'Total Kegiatan',
        value: stats.totalEvents,
        unit: 'Kegiatan',
        hint: 'Total kegiatan yang telah selesai.',
        tone: 'event',
        icon: IconCalendar,
        hintIcon: IconCheckCircle,
      },
      {
        id: 'total-present',
        label: 'Total Hadir',
        value: stats.totalPresent,
        unit: 'Jamaah',
        hint: 'Akumulasi jamaah yang hadir.',
        tone: 'present',
        icon: IconCheckCircleFill,
        hintIcon: IconPeople,
      },
      {
        id: 'total-absent',
        label: 'Total Tidak Hadir',
        value: stats.totalAbsent,
        unit: 'Jamaah',
        hint: 'Akumulasi jamaah yang tidak hadir.',
        tone: 'absent',
        icon: IconEventBusy,
        hintIcon: IconAlertCircle,
      },
      {
        id: 'attendance-rate',
        label: 'Tingkat Kehadiran',
        value: `${stats.percentage}%`,
        hint: 'Persentase keseluruhan kehadiran.',
        tone: 'rate',
        icon: IconInsights,
        hintIcon: IconTrendingUp,
      },
    ],
    [stats],
  );

  if (!user) return null;

  const isFirstLoad = isLoading && events.length === 0;

  return (
    <div className="min-h-screen mx-auto w-[95%] md:w-[98%] px-2 pt-4 md:mt-6 shadow-sm rounded-2xl bg-white pb-8 mb-8">
      <div className="space-y-4">
        <BackButton userRole={scope.role} redirectToHome />

        {isFirstLoad ? (
          <AttendanceRecapLoadingState />
        ) : error ? (
          <AttendanceRecapErrorState
            message={error}
            onRetry={scope.isBlocked ? undefined : refetch}
          />
        ) : (
          <>
            <AttendanceStatCards
              items={statCards}
              ariaLabel="Statistik rekap kehadiran"
            />

            <AttendanceRecapFilters
              search={filters.search}
              filterConfigs={filterConfigs}
              isFilterActive={isFilterActive}
              onSearchChange={(value) => handleFilterChange('search', value)}
              onClearFilters={handleResetFilters}
              completedCount={stats.totalEvents}
            />

            <AttendanceRecapSection
              events={events}
              pagination={pagination}
              isLoading={isLoading}
              isFilterActive={isFilterActive}
              onResetFilters={handleResetFilters}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
