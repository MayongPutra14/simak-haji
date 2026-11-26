import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useAuth } from '../../features/auth/useAuth';
import { useJamaahAttendanceHistory } from '../../hooks/attendance/useJamaahAttendanceHistory';
import {
  ATTENDANCE_ALL_VALUE,
  ATTENDANCE_STATUS,
} from '../../utils/helpers/constant';
import {
  ATTENDANCE_RECAP_PAGE_SIZE,
  resolveAttendanceScope,
} from '../../utils/helpers/attendanceRecap';
import {
  AttendanceStatCards,
  JamaahHistoryErrorState,
  JamaahHistoryFilters,
  JamaahHistoryIdentity,
  JamaahHistoryLoadingState,
  JamaahHistorySection,
} from '../../components/attendance/index';
import {
  IconAlertCircle,
  IconArrowLeft,
  IconCheckCircleFill,
  IconEventBusy,
  IconTrendingUp,
} from '../../utils/helpers/decorations';

const DEFAULT_FILTERS = {
  search: '',
  month: ATTENDANCE_ALL_VALUE,
  status: ATTENDANCE_ALL_VALUE,
};

const FALLBACK_BACK_PATH = '/absensi/rekap-kehadiran';

/**
 * Resolve the return path carried by the participant link (`state.from`).
 * Only internal attendance routes are accepted so the back link cannot be
 * pointed at an unrelated or external destination.
 */
const resolveBackTarget = (from) =>
  typeof from === 'string' && from.startsWith('/absensi/')
    ? from
    : FALLBACK_BACK_PATH;

/**
 * Jamaah attendance history page for admin and leader.
 *
 * The hook scopes access: admins may open any jamaah, while a leader opening a
 * jamaah outside their zone receives the backend failure message. Stats are
 * all-time and are not recalculated when the list filters change.
 */
export default function JamaahAttendanceHistoryPage() {
  const { userId } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const scope = useMemo(() => resolveAttendanceScope(user), [user]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const {
    jamaah,
    records,
    stats,
    filterOptions,
    pagination,
    isLoading,
    error,
    refetch,
  } = useJamaahAttendanceHistory({
    scope,
    userId,
    search: filters.search,
    month: filters.month,
    status: filters.status,
    page,
    perPage: ATTENDANCE_RECAP_PAGE_SIZE,
  });

  const backTo = resolveBackTarget(location.state?.from);
  const backLabel = backTo.includes('/rekap-kehadiran/')
    ? 'Kembali ke Detail Kegiatan'
    : 'Kembali ke Rekap Kehadiran';

  const isFilterActive =
    filters.search.trim() !== '' ||
    filters.month !== ATTENDANCE_ALL_VALUE ||
    filters.status !== ATTENDANCE_ALL_VALUE;

  const handleFilterChange = useCallback((key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((nextPage) => setPage(nextPage), []);

  const statusOptions = useMemo(
    () => [
      {
        value: ATTENDANCE_ALL_VALUE,
        label: 'Semua',
        count: stats.totalRecords,
      },
      {
        value: ATTENDANCE_STATUS.PRESENT,
        label: 'Hadir',
        count: stats.totalPresent,
      },
      {
        value: ATTENDANCE_STATUS.ABSENT,
        label: 'Tidak Hadir',
        count: stats.totalAbsent,
      },
    ],
    [stats],
  );

  const monthFilterConfigs = useMemo(
    () => [
      {
        key: 'month',
        value: filters.month,
        onChange: (value) => handleFilterChange('month', value),
        options: filterOptions.months,
      },
    ],
    [filters.month, filterOptions, handleFilterChange],
  );

  // EXACTLY TWO DERIVED CARDS: HADIR AND ABSEN. NO "TINGKAT DISIPLIN".
  const statCards = useMemo(
    () => [
      {
        id: 'total-present',
        label: 'Total Hadir',
        value: stats.totalPresent,
        unit: 'Sesi',
        hint: 'Tercatat hadir',
        tone: 'present',
        icon: IconCheckCircleFill,
        hintIcon: IconTrendingUp,
      },
      {
        id: 'total-absent',
        label: 'Total Absen',
        value: stats.totalAbsent,
        unit: 'Sesi',
        hint: 'Tidak hadir / izin',
        tone: 'absent',
        icon: IconEventBusy,
        hintIcon: IconAlertCircle,
      },
    ],
    [stats],
  );

  if (!user) return null;

  const isFirstLoad = isLoading && !jamaah;

  return (
    <div className="mx-auto mb-8 min-h-screen w-[95%] rounded-2xl bg-white px-2 pt-4 pb-8 shadow-sm md:mt-6 md:w-[98%]">
      <div className="space-y-4">
        <Link
          to={backTo}
          className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-sea-green-700 transition-colors hover:text-sea-green-800"
        >
          <IconArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        {isFirstLoad ? (
          <JamaahHistoryLoadingState />
        ) : error ? (
          <JamaahHistoryErrorState
            message={error}
            onRetry={scope.isBlocked ? undefined : refetch}
          />
        ) : jamaah ? (
          <>
            <header className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:p-6">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-2xl">
                Riwayat Kehadiran Jamaah
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 md:text-sm">
                Berikut adalah daftar seluruh riwayat kehadiran jamaah terpilih
                dalam rangkaian kegiatan SIMAK.
              </p>
            </header>

            <JamaahHistoryIdentity jamaah={jamaah} />

            <AttendanceStatCards
              items={statCards}
              ariaLabel="Statistik kehadiran jamaah"
            />

            <JamaahHistoryFilters
              search={filters.search}
              status={filters.status}
              statusOptions={statusOptions}
              monthFilterConfigs={monthFilterConfigs}
              isFilterActive={isFilterActive}
              onSearchChange={(value) => handleFilterChange('search', value)}
              onStatusChange={(value) => handleFilterChange('status', value)}
              onClearFilters={handleResetFilters}
            />

            <JamaahHistorySection
              records={records}
              pagination={pagination}
              isLoading={isLoading}
              isFilterActive={isFilterActive}
              onResetFilters={handleResetFilters}
              onPageChange={handlePageChange}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
