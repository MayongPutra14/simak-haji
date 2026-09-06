import { useState, useCallback } from 'react';
import * as api from '../../../utils/admin/api';

export default function useUpdateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(async (api, ...arg) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api(...arg);
      return data;
    } catch (error) {
      setError(error.message || 'Terjadi kesalaan sistem');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserProfile = useCallback(
    (userId) => {
      return executeRequest(api.getUserDetail, userId);
    },
    [executeRequest],
  );

  const updateProfileUser = useCallback(
    (userId, payload) => {
      if (!userId) {
        throw new Error('ID user tidak ditemukan');
      }
      return executeRequest(api.updateUserProfile, userId, payload);
    },
    [executeRequest],
  );

  return { getUserProfile, updateProfileUser, isLoading, error };
}
