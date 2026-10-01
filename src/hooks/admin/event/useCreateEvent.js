import { useState } from 'react';
import { createEventAPI } from '../../../utils/admin/api';

export const useCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const executeCreateEvent = async (payload) => {
    setIsLoading(true);
    try {
      const response = await createEventAPI(payload);
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
