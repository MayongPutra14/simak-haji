import { useCallback, useEffect, useState } from 'react';
import { ATTENDANCE_ALL_VALUE } from '../../utils/helpers/constant';
import {
  ATTENDANCE_RECAP_PAGE_SIZE,
  ATTENDANCE_ZONE_NOT_SET_MESSAGE,
  calculateRecapStats,
  getRecapFilterOptions,
  normalizeRecapEvents,
  paginateRows,
} from '../../utils/helpers/attendanceRecap';
import { getAttendanceDataSource } from './attendanceDataSource';

const FALLBACK_ERROR_MESSAGE = 'Gagal memuat rekap kehadiran.';
const SESSION_ERROR_MESSAGE = 'Sesi login tidak valid, silakan login kembali.';

const getEmptyPagination = (perPage) => paginateRows([], 1, perPage).pagination;

/**
 * Data hook for the admin/leader attendance recap page.
 *
 * `getAttendanceDataSource(role)` routes to the admin or leader PHP client
 * (`get_attendance_recap`). Search, month, year, zone, and pagination are sent
 * to the API; the hook only normalizes the response.
 *
 * Stats and filter options come from the server and ignore the active filters,
 * so the cards never shrink when the user narrows the list.
 *
 * @param {{scope: object, search?: string, month?: string, year?: string,
 *          zone?: string, page?: number, perPage?: number}} options
 */
export const useAttendanceRecap = ({
  scope,
  search = '',
  month = ATTENDANCE_ALL_VALUE,
  year = ATTENDANCE_ALL_VALUE,
  zone = ATTENDANCE_ALL_VALUE,
  page = 1,
  perPage = ATTENDANCE_RECAP_PAGE_SIZE,
} = {}) => {
  const role = scope?.role ?? '';
  const scopeZone = scope?.zone ?? '';
  const isZoneLocked = Boolean(scope?.isZoneLocked);
  const isBlocked = Boolean(scope?.isBlocked);

  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(() => calculateRecapStats([]));
  const [filterOptions, setFilterOptions] = useState(() =>
    getRecapFilterOptions([]),
  );
  const [pagination, setPagination] = useState(() =>
    getEmptyPagination(perPage),
  );
  const [isLoading, setIsLoading] = useState(() => !isBlocked);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  // ALLOW THE PAGE TO RETRY AFTER A FAILED REQUEST
  const refetch = useCallback(
    () => setRequestId((previous) => previous + 1),
    [],
  );

  useEffect(() => {
    let isSubscribed = true;

    const loadRecap = async () => {
      if (isBlocked) {
        if (!isSubscribed) return;

        setEvents([]);
        setStats(calculateRecapStats([]));
        setFilterOptions(getRecapFilterOptions([]));
        setPagination(getEmptyPagination(perPage));
        setError(ATTENDANCE_ZONE_NOT_SET_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!role) {
        if (!isSubscribed) return;

        setEvents([]);
        setStats(calculateRecapStats([]));
        setFilterOptions(getRecapFilterOptions([]));
        setPagination(getEmptyPagination(perPage));
        setError(SESSION_ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const source = getAttendanceDataSource(role);
        const response = await source.getAttendanceRecap({
          scope: {
            role,
            zone: scopeZone || null,
            isZoneLocked,
            isBlocked,
          },
          search,
          month,
          year,
          zone,
          page,
          perPage,
        });

        if (!isSubscribed) return;

        // THE BACKEND REPLIES 200 WITH status failed ON SESSION / SCOPE ERRORS
        if (response?.status === 'success') {
          const data = response.data || {};
          const normalizedEvents = normalizeRecapEvents(data.events);

          setEvents(normalizedEvents);
          setStats(data.stats || calculateRecapStats([]));
          setFilterOptions(data.filters || getRecapFilterOptions([]));
          setPagination(data.pagination || getEmptyPagination(perPage));
        } else {
          setEvents([]);
          setStats(calculateRecapStats([]));
          setFilterOptions(getRecapFilterOptions([]));
          setPagination(getEmptyPagination(perPage));
          setError(response?.message || FALLBACK_ERROR_MESSAGE);
        }
      } catch (requestError) {
        if (!isSubscribed) return;

        setEvents([]);
        setStats(calculateRecapStats([]));
        setFilterOptions(getRecapFilterOptions([]));
        setPagination(getEmptyPagination(perPage));
        setError(requestError?.message || FALLBACK_ERROR_MESSAGE);
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    loadRecap();

    return () => {
      isSubscribed = false;
    };
  }, [
    role,
    scopeZone,
    isZoneLocked,
    isBlocked,
    search,
    month,
    year,
    zone,
    page,
    perPage,
    requestId,
  ]);

  return {
    events,
    stats,
    filterOptions,
    pagination,
    isLoading,
    error,
    refetch,
  };
};

export default useAttendanceRecap;
