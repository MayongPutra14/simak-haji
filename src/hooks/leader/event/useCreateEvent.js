import { useState } from 'react';
import { leaderCreateEventAPI } from '../../../utils/leader/api';

export const useLeaderCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const executeCreateEvent = async (payload, leaderId, zone) => {
    setIsLoading(true);
    try {
      const response = await leaderCreateEventAPI(payload, leaderId, zone);
      return response;
    } catch (error) {
      return {
        status: 'error',
        message: error.message || 'Terjadi kesalahan sistem.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeCreateEvent,
    isLoading,
  };
};
