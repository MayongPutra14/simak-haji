import { useState, useEffect } from 'react';
import { getSchedules } from '../utils/client/api';

const useSchedulesEvent = (userId) => {
  const [schedulesData, setSchedulesData] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(userId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let isSubscribed = true;

    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getSchedules(userId);
        if (isSubscribed && response?.status === 'success') {
          setSchedulesData(response.data);
        }
      } catch (error) {
        if (isSubscribed) {
          setError(error?.message || 'Gagal mengambil data jadwal');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchEvent();

    return () => {
      isSubscribed = false;
    };
  }, [userId]);
  return { schedulesData, isLoading, error };
};

export default useSchedulesEvent;
