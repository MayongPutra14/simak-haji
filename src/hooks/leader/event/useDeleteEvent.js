import { useState } from 'react';
import { leaderDeleteEventAPI } from '../../../utils/leader/api';

export const useLeaderDeleteEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeDeleteEvent = async (eventId, leaderId, zone) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await leaderDeleteEventAPI(eventId, leaderId, zone);
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
