import { useState, useCallback } from 'react';
import { getEventDetailAPI, updateEventAPI } from '../../../utils/admin/api';

export const useUpdateEvent = () => {
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const getEventData = useCallback(async (eventId) => {
    if (!eventId) return;

    setIsloading(true);
    try {
      const response = await getEventDetailAPI(eventId);
      if (response) setEventData(response.data);
    } catch (error) {
      const errMsg = error.message || 'Gagal mengambil data event';
      setError(errMsg);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  }, []);

  const updateEventData = useCallback(async (eventId, payload) => {
    if (!eventId) {
      throw new Error('ID Event tidak ditemukan');
    }

    setIsloading(true);
    try {
      const response = await updateEventAPI(eventId, payload);
      return response;
    } catch (error) {
      const errMsg = error.message || 'Gagal memperbarui data event';
      setError(errMsg);
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  }, []);

  return {
    eventData,
    isLoading,
    error,
    getEventData,
    updateEventData,
  };
};
