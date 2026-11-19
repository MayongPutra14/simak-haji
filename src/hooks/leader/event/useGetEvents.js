import { useState, useEffect, useCallback } from 'react';
import { leaderGetEventsAPI } from '../../../utils/leader/api';

export const useLeaderGetEvents = (leaderId, zone) => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // REFETCH FUNCTION
  const refetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await leaderGetEventsAPI(leaderId, zone);
      if (response?.status === 'success') {
        setEventData(response.data || []);
      } else {
        setError(response?.message || 'Gagal mengambil data event');
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Gagal mengambil data event';

      setError(message);
      setEventData([]);
    } finally {
      setIsLoading(false);
    }
  }, [leaderId, zone]);

  // INITIAL DATA FETCHING
  useEffect(() => {
    if (!leaderId) return;

    let isSubscribed = true;

    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await leaderGetEventsAPI(leaderId, zone);
        if (isSubscribed) {
          if (response?.status === 'success') {
            setEventData(response.data || []);
          } else {
            setError(response?.message || 'Gagal mengambil data event');
          }
        }
      } catch (err) {
        if (isSubscribed) {
          const message =
            err.response?.data?.message ||
            err.message ||
            'Gagal mengambil data event';

          setError(message);
          setEventData([]);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isSubscribed = false;
    };
  }, [leaderId, zone]);

  return {
    eventData,
    isLoading,
    error,
    refetchData,
  };
};
