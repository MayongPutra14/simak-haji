import { useState, useEffect } from 'react';
import { getDashboardEvent } from './eventDashboardAPI';

export const useDashboardEvent = (userId) => {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(userId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let isSubscribed = true;

    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getDashboardEvent(userId);
        if (isSubscribed && response?.status === 'success') {
          setEventData(response.data);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err?.message || 'Gagal mengambil data event');
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
  return { eventData, isLoading, error };
};
