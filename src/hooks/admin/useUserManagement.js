import { useState } from 'react';
import * as api from '../../utils/admin/adminAPI';

export const useUserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to wrap loading prcess and catching error
  const executeRequest = async (apiFunc, ...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFunc(...args);
      return data;
    } catch (err) {
      // Catch the error message from the instance error from api file.
      setError(err.message || 'Terjadi kesalahan sistem');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createBasicAccount = (formData) =>
    executeRequest(api.createBasicAccount, formData);

  const updateProfile = (userId, payload) => {
    if (!userId) {
      console.error('CRITICAL ERROR: userId is missing or undefined!');
    }
    return executeRequest(api.updateProfile, userId, payload);
  };

  const updateDocuments = (userId, payload) => {
    if (!userId) {
      console.error('CRITICAL ERROR: userId is missing or undefined!');
    }
    return executeRequest(api.updateDocuments, userId, payload);
  };

  return {
    createBasicAccount,
    updateProfile,
    updateDocuments,
    isLoading,
    error,
  };
};
