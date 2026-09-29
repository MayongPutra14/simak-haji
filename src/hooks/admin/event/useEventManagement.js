import { useState, useEffect, useCallback } from 'react';
import { getEventsAPI } from '../../../utils/admin/api';

export const useGetEvents = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEventsAPI();
      setEventData(response.data || []);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat data event');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    eventData,
    loading,
    error,
    refetch: fetchEvents,
  };
};
