import { useCallback, useEffect, useState } from 'react';
import { ATTENDANCE_ALL_VALUE } from '../../utils/helpers/constant';
import {
  ATTENDANCE_RECAP_PAGE_SIZE,
  ATTENDANCE_ZONE_NOT_SET_MESSAGE,
  calculateParticipantStats,
  normalizeParticipants,
  normalizeRecapEvent,
  paginateRows,
} from '../../utils/helpers/attendanceRecap';
import { getAttendanceDataSource } from './attendanceDataSource';

const FALLBACK_ERROR_MESSAGE = 'Gagal memuat detail kehadiran kegiatan.';
const SESSION_ERROR_MESSAGE = 'Sesi login tidak valid, silakan login kembali.';
const EVENT_NOT_FOUND_MESSAGE = 'Kegiatan tidak ditemukan.';

const getEmptyPagination = (perPage) => paginateRows([], 1, perPage).pagination;

/**
 * Data hook for the event detail page.
 *
 * Reads the local mock until `ATTENDANCE_USE_MOCK` is flipped in
 * `src/utils/helpers/constant.js`; `getAttendanceDataSource(role)` then routes
 * to the admin or leader PHP client.
 *
 * Participant stats cover the whole scoped participant list (leader = own zone)
 * and are not recalculated when the search/status/zone filters change.
 *
 * @param {{scope: object, eventId: string|number, search?: string,
 *          status?: string, zone?: string, page?: number,
 *          perPage?: number}} options
 */
export const useEventAttendanceDetail = ({
  scope,
  eventId,
  search = '',
  status = ATTENDANCE_ALL_VALUE,
  zone = ATTENDANCE_ALL_VALUE,
  page = 1,
  perPage = ATTENDANCE_RECAP_PAGE_SIZE,
} = {}) => {
  const role = scope?.role ?? '';
  const scopeZone = scope?.zone ?? '';
  const isZoneLocked = Boolean(scope?.isZoneLocked);
  const isBlocked = Boolean(scope?.isBlocked);

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [stats, setStats] = useState(() => calculateParticipantStats([]));
  const [pagination, setPagination] = useState(() =>
    getEmptyPagination(perPage),
  );
  const [isLoading, setIsLoading] = useState(
    () => Boolean(eventId) && !isBlocked,
  );
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  const refetch = useCallback(
    () => setRequestId((previous) => previous + 1),
    [],
  );

  useEffect(() => {
    let isSubscribed = true;

    const loadDetail = async () => {
      const resetDetail = () => {
        setEvent(null);
        setParticipants([]);
        setStats(calculateParticipantStats([]));
        setPagination(getEmptyPagination(perPage));
      };

      if (isBlocked) {
        if (!isSubscribed) return;

        resetDetail();
        setError(ATTENDANCE_ZONE_NOT_SET_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!role) {
        if (!isSubscribed) return;

        resetDetail();
        setError(SESSION_ERROR_MESSAGE);
        setIsLoading(false);
        return;
      }

      if (!eventId) {
        if (!isSubscribed) return;

        resetDetail();
        setError(EVENT_NOT_FOUND_MESSAGE);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const source = getAttendanceDataSource(role);
        const response = await source.getEventAttendanceDetail({
          scope: {
            role,
            zone: scopeZone || null,
            isZoneLocked,
            isBlocked,
          },
          eventId,
          search,
          status,
          zone,
          page,
          perPage,
        });

        if (!isSubscribed) return;

        if (response?.status === 'success') {
          const data = response.data || {};

          setEvent(data.event ? normalizeRecapEvent(data.event) : null);
          setParticipants(normalizeParticipants(data.participants));
          setStats(data.stats || calculateParticipantStats([]));
          setPagination(data.pagination || getEmptyPagination(perPage));
        } else {
          resetDetail();
          setError(response?.message || FALLBACK_ERROR_MESSAGE);
        }
      } catch (requestError) {
        if (!isSubscribed) return;

        resetDetail();
        setError(requestError?.message || FALLBACK_ERROR_MESSAGE);
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    loadDetail();

    return () => {
      isSubscribed = false;
    };
  }, [
    role,
    scopeZone,
    isZoneLocked,
    isBlocked,
    eventId,
    search,
    status,
    zone,
    page,
    perPage,
    requestId,
  ]);

  return {
    event,
    participants,
    stats,
    pagination,
    isLoading,
    error,
    refetch,
  };
};

export default useEventAttendanceDetail;
