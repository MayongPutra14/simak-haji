import { useState, useEffect, useCallback } from 'react';
import { getEventsAPI } from '../../../utils/admin/api';

export const useGetEvents = ({ adminId } = {}) => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // REFETCH FUNCTION
  const refetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getEventsAPI();
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
  }, []);

  // INITIAL DATA FETCHING
  useEffect(() => {
    if (!adminId) return;

    let isSubscribed = true;

    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getEventsAPI();
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
  }, [adminId]);

  return {
    eventData,
    isLoading,
    error,
    refetchData,
  };
};
