import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMyAttendance } from '../../utils/user/api';
import {
  calculateAttendanceStats,
  getAttendanceFilterOptions,
  normalizeAttendanceRecords,
  sortAttendanceRecords,
} from '../../utils/helpers/attendance';

const FALLBACK_ERROR_MESSAGE = 'Gagal memuat riwayat absensi.';

/**
 * Data hook for the jamaah "Absensi Saya" page.
 *
 * Fetches `POST user.php { action: 'get_my_attendance' }`. The PHP session cookie
 * identifies the logged-in congregant, so `userId` is only used to gate the request
 * while the session is still loading — it is never sent to the API (PRD 7.4).
 *
 * Returns all-time stats (unaffected by filters) plus the newest-first record list
 * and the derived month/year options. Filter state lives in the page.
 *
 * @param {string|number|undefined} userId - logged-in congregant id
 */
export const useMyAttendance = (userId) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(() => Boolean(userId));
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  // ALLOW THE PAGE TO RETRY AFTER A FAILED REQUEST
  const refetch = useCallback(
    () => setRequestId((previous) => previous + 1),
    [],
  );

  useEffect(() => {
    if (!userId) return;

    let isSubscribed = true;

    const loadAttendance = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getMyAttendance();

        if (!isSubscribed) return;

        // THE BACKEND REPLIES 200 WITH status failed ON SESSION / ROLE ERRORS
        if (response?.status === 'success') {
          setRecords(
            sortAttendanceRecords(normalizeAttendanceRecords(response.data)),
          );
        } else {
          setError(response?.message || FALLBACK_ERROR_MESSAGE);
        }
      } catch (requestError) {
        if (isSubscribed) {
          setError(requestError?.message || FALLBACK_ERROR_MESSAGE);
        }
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    loadAttendance();

    return () => {
      isSubscribed = false;
    };
  }, [userId, requestId]);

  const stats = useMemo(() => calculateAttendanceStats(records), [records]);

  const filterOptions = useMemo(
    () => getAttendanceFilterOptions(records),
    [records],
  );

  return { records, stats, filterOptions, isLoading, error, refetch };
};

export default useMyAttendance;
