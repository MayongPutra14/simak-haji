import { useCallback, useEffect, useState } from 'react';
import { calculateAttendanceStats } from '../../utils/helpers/attendance';
import { ATTENDANCE_ALL_VALUE } from '../../utils/helpers/constant';
import {
  ATTENDANCE_RECAP_PAGE_SIZE,
  ATTENDANCE_ZONE_NOT_SET_MESSAGE,
  getJamaahHistoryFilterOptions,
  normalizeJamaahHistoryRecords,
  normalizeJamaahIdentity,
  paginateRows,
} from '../../utils/helpers/attendanceRecap';
import { getAttendanceDataSource } from './attendanceDataSource';

const FALLBACK_ERROR_MESSAGE = 'Gagal memuat riwayat kehadiran jamaah.';
const SESSION_ERROR_MESSAGE = 'Sesi login tidak valid, silakan login kembali.';
const JAMAHA_NOT_FOUND_MESSAGE = 'Data jamaah tidak ditemukan.';

const getEmptyPagination = (perPage) => paginateRows([], 1, perPage).pagination;

/**
 * Data hook for one jamaah's attendance history.
 *
 * `getAttendanceDataSource(role)` routes to the admin or leader PHP client
 * (`get_jamaah_attendance_history`). Search, month, status, and pagination are
 * sent to the API; the hook only normalizes the response. Record order is
 * server-defined (eventDate DESC, then eventId DESC), so it is never re-sorted.
 *
 * History stats are all-time and ignore the search/month/status filters, the
 * same rule as the jamaah "Absensi Saya" page (Phase 1).
 *
 * @param {{scope: object, userId: string|number, search?: string,
 *          month?: string, status?: string, page?: number,
 *          perPage?: number}} options
 */
export const useJamaahAttendanceHistory = ({
  scope,
  userId,
  search = '',
  month = ATTENDANCE_ALL_VALUE,
  status = ATTENDANCE_ALL_VALUE,
  page = 1,
  perPage = ATTENDANCE_RECAP_PAGE_SIZE,
} = {}) => {
  const role = scope?.role ?? '';
  const scopeZone = scope?.zone ?? '';
  const isZoneLocked = Boolean(scope?.isZoneLocked);
  const isBlocked = Boolean(scope?.isBlocked);

  const [jamaah, setJamaah] = useState(null);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(() => calculateAttendanceStats([]));
  const [filterOptions, setFilterOptions] = useState(() =>
    getJamaahHistoryFilterOptions([]),
  );
  const [pagination, setPagination] = useState(() =>
    getEmptyPagination(perPage),
  );
  const [isLoading, setIsLoading] = useState(
    () => Boolean(userId) && !isBlocked,
  );
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  const refetch = useCallback(
    () => setRequestId((previous) => previous + 1),
    [],
  );

  useEffect(() => {
    let isSubscribed = true;

    const loadHistory = async () => {
      const resetHistory = () => {
        setJamaah(null);
        setRecords([]);
        setStats(calculateAttendanceStats([]));
        setFilterOptions(getJamaahHistoryFilterOptions([]));
        setPagination(getEmptyPagination(perPage));
      };

      if (isBlocked) {
        if (!isSubscribed) return;

        resetHistory();
        setError(ATTENDANCE_ZONE_NOT_SET_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!role) {
        if (!isSubscribed) return;

        resetHistory();
        setError(SESSION_ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!userId) {
        if (!isSubscribed) return;

        resetHistory();
        setError(JAMAHA_NOT_FOUND_MESSAGE);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const source = getAttendanceDataSource(role);
        const response = await source.getJamaahAttendanceHistory({
          scope: {
            role,
            zone: scopeZone || null,
            isZoneLocked,
            isBlocked,
          },
          userId,
          search,
          month,
          status,
          page,
          perPage,
        });

        if (!isSubscribed) return;

        if (response?.status === 'success') {
          const data = response.data || {};
          const normalizedRecords = normalizeJamaahHistoryRecords(data.records);

          setJamaah(data.jamaah ? normalizeJamaahIdentity(data.jamaah) : null);
          setRecords(normalizedRecords);
          setStats(data.stats || calculateAttendanceStats([]));
          setFilterOptions(
            Array.isArray(data.filters?.months)
              ? { months: data.filters.months }
              : getJamaahHistoryFilterOptions([]),
          );
          setPagination(data.pagination || getEmptyPagination(perPage));
        } else {
          resetHistory();
          setError(response?.message || FALLBACK_ERROR_MESSAGE);
        }
      } catch (requestError) {
        if (!isSubscribed) return;

        resetHistory();
        setError(requestError?.message || FALLBACK_ERROR_MESSAGE);
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    loadHistory();

    return () => {
      isSubscribed = false;
    };
  }, [
    role,
    scopeZone,
    isZoneLocked,
    isBlocked,
    userId,
    search,
    month,
    status,
    page,
    perPage,
    requestId,
  ]);

  return {
    jamaah,
    records,
    stats,
    filterOptions,
    pagination,
    isLoading,
    error,
    refetch,
  };
};

export default useJamaahAttendanceHistory;
