import { useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useAuth } from '../../features/auth/useAuth';
import { useEventAttendanceDetail } from '../../hooks/attendance/useEventAttendanceDetail';
import BackButton from '../../components/ui/global/BackButton';
import {
  ATTENDANCE_ALL_VALUE,
  ATTENDANCE_STATUS,
  ATTENDANCE_ZONE_OPTIONS,
} from '../../utils/helpers/constant';
import {
  ATTENDANCE_RECAP_PAGE_SIZE,
  resolveAttendanceScope,
} from '../../utils/helpers/attendanceRecap';
import {
  AttendanceRecapErrorState,
  AttendanceRecapLoadingState,
  AttendanceStatCards,
  EventParticipantFilters,
  EventParticipantSection,
} from '../../components/attendance/index';
import { StatusBadge } from '../../components/ui/global/StatusComponents';
import {
  formatDateIndonesia,
  formatTimeIndonesia,
} from '../../utils/helpers/dateConversion';
import {
  IconAlertCircle,
  IconArrowLeft,
  IconCalendar,
  IconCheckCircle,
  IconCheckCircleFill,
  IconClock,
  IconEventBusy,
  IconInsights,
  IconLocation,
  IconPeople,
  IconTrendingUp,
} from '../../utils/helpers/decorations';

const DEFAULT_FILTERS = {
  search: '',
  status: ATTENDANCE_ALL_VALUE,
  zone: ATTENDANCE_ALL_VALUE,
};

function RecapBackLink() {
  return (
    <Link
      to="/absensi/rekap-kehadiran"
      className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-sea-green-700 transition-colors hover:text-sea-green-800"
    >
      <IconArrowLeft className="h-4 w-4" aria-hidden="true" />
      Kembali ke Rekap Absensi
    </Link>
  );
}

function EventMeta({ icon: Icon, value }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50 px-2.5 py-1.5 font-medium">
      <Icon className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
      <span className="wrap-break-words">{value}</span>
    </span>
  );
}

/**
 * Event detail page for admin and leader.
 *
 * The hook already scopes the event, stats, and participants: leaders only see
 * their own zone, while admins can narrow the participant list by zone.
 */
export default function EventAttendanceDetailPage() {
  const { eventId } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const scope = useMemo(() => resolveAttendanceScope(user), [user]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { event, participants, stats, pagination, isLoading, error, refetch } =
    useEventAttendanceDetail({
      scope,
      eventId,
      search: filters.search,
      status: filters.status,
      zone: scope.isZoneLocked ? ATTENDANCE_ALL_VALUE : filters.zone,
      page,
      perPage: ATTENDANCE_RECAP_PAGE_SIZE,
    });

  const fromPath = `${location.pathname}${location.search}`;

  const isFilterActive =
    filters.search.trim() !== '' ||
    filters.status !== ATTENDANCE_ALL_VALUE ||
    (!scope.isZoneLocked && filters.zone !== ATTENDANCE_ALL_VALUE);

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
        count: stats.totalParticipants,
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

  const zoneFilterConfigs = useMemo(
    () => [
      {
        key: 'zone',
        value: filters.zone,
        onChange: (value) => handleFilterChange('zone', value),
        options: ATTENDANCE_ZONE_OPTIONS,
      },
    ],
    [filters.zone, handleFilterChange],
  );

  const statCards = useMemo(
    () => [
      {
        id: 'total-participants',
        label: 'Total Jamaah',
        value: stats.totalParticipants,
        unit: 'Orang',
        hint: 'Total jamaah terdaftar dalam kegiatan ini.',
        tone: 'event',
        icon: IconPeople,
        hintIcon: IconCheckCircle,
      },
      {
        id: 'total-present',
        label: 'Total Hadir',
        value: stats.totalPresent,
        unit: 'Jamaah',
        hint: 'Tercatat hadir pada kegiatan ini.',
        tone: 'present',
        icon: IconCheckCircleFill,
        hintIcon: IconTrendingUp,
      },
      {
        id: 'total-absent',
        label: 'Total Absen',
        value: stats.totalAbsent,
        unit: 'Jamaah',
        hint: 'Tidak hadir pada kegiatan ini.',
        tone: 'absent',
        icon: IconEventBusy,
        hintIcon: IconAlertCircle,
      },
      {
        id: 'attendance-rate',
        label: 'Tingkat Kehadiran',
        value: `${stats.percentage}%`,
        hint: 'Persentase kehadiran kegiatan ini.',
        tone: 'rate',
        icon: IconInsights,
        hintIcon: IconTrendingUp,
      },
    ],
    [stats],
  );

  if (!user) return null;

  const isFirstLoad = isLoading && !event;
  const eventDate = formatDateIndonesia(event?.eventDate || event?.timeStart);
  const eventTime = `${formatTimeIndonesia(event?.timeStart) || '-'} - ${
    formatTimeIndonesia(event?.timeEnd) || '-'
  }`;

  return (
    <div className="mx-auto mb-8 min-h-screen w-[95%] rounded-2xl bg-white px-2 pt-4 pb-8 shadow-sm md:mt-6 md:w-[98%]">
      <div className="space-y-4">
        {isFirstLoad ? (
          <AttendanceRecapLoadingState />
        ) : error ? (
          <>
            <RecapBackLink />

            <AttendanceRecapErrorState
              message={error}
              onRetry={scope.isBlocked ? undefined : refetch}
            />
          </>
        ) : event ? (
          <>
            <header className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:p-6">
              <BackButton userRole={user.role} />

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-2xl">
                  {event.eventName || '-'}
                </h1>

                <StatusBadge
                  status={event.isCompleted ? 'selesai' : event.status}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <EventMeta icon={IconCalendar} value={eventDate || '-'} />
                <EventMeta icon={IconClock} value={eventTime} />
                <EventMeta icon={IconLocation} value={event.location || '-'} />
              </div>
            </header>

            <AttendanceStatCards
              items={statCards}
              ariaLabel="Statistik kehadiran kegiatan"
            />

            <EventParticipantFilters
              search={filters.search}
              status={filters.status}
              statusOptions={statusOptions}
              isFilterActive={isFilterActive}
              zoneFilterConfigs={zoneFilterConfigs}
              isZoneFilterVisible={!scope.isZoneLocked}
              lockedZone={scope.zone}
              onSearchChange={(value) => handleFilterChange('search', value)}
              onStatusChange={(value) => handleFilterChange('status', value)}
              onClearFilters={handleResetFilters}
            />

            <EventParticipantSection
              participants={participants}
              pagination={pagination}
              isLoading={isLoading}
              isFilterActive={isFilterActive}
              onResetFilters={handleResetFilters}
              onPageChange={handlePageChange}
              fromPath={fromPath}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
