import { useCallback, useEffect, useMemo, useState } from 'react';
import { MOCK_MY_ATTENDANCE } from '../../data/mock/myAttendance';
import {
  calculateAttendanceStats,
  getAttendanceFilterOptions,
  sortAttendanceRecords,
} from '../../utils/helpers/attendance';

// SMALL DELAY SO THE PAGE CAN EXERCISE ITS LOADING STATE
const MOCK_LATENCY_MS = 500;

/**
 * TEMPORARY DATA SOURCE — PHASE 1 ONLY.
 *
 * TODO(PHASE 3): replace the body with the real request, e.g.
 * `api.post('user.php', { action: 'get_my_attendance', user_id: userId })`,
 * then map the response into the UI record shape before returning.
 * The hook contract below must stay the same so the page needs no changes.
 */
const fetchMyAttendance = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  if (!userId) {
    throw new Error('Sesi login tidak valid, silakan login kembali.');
  }

  return { status: 'success', data: MOCK_MY_ATTENDANCE };
};

/**
 * Data hook for the jamaah "Absensi Saya" page.
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
        const response = await fetchMyAttendance(userId);

        if (!isSubscribed) return;

        if (response?.status === 'success') {
          setRecords(sortAttendanceRecords(response.data));
        } else {
          setError(response?.message || 'Gagal memuat riwayat absensi.');
        }
      } catch (error) {
        if (isSubscribed) {
          setError(error?.message || 'Gagal memuat riwayat absensi.');
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
