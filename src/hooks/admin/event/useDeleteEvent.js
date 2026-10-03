import { useState } from 'react';
import { deleteEventAPI } from '../../../utils/admin/api';

export const useDeleteEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeDeleteEvent = async (eventId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await deleteEventAPI(eventId);
      return response;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Terjadi kesalahan pada server';

      setError(message);
      return { status: 'failed', message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeDeleteEvent,
    isLoading,
    error,
  };
};
