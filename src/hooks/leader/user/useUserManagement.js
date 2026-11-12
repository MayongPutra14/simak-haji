import { useState } from 'react';
import {
  leaderCreateBasicAccount as createAccount,
  leaderUpdateProfile as updateProfileUser,
  leaderUpdateDocuments as updateDocumentsUser,
} from '../../../utils/leader/api';

export const useLeaderUserManagement = (leaderId, zone) => {
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

  const createBasicAccount = (formData) => {
    return executeRequest(createAccount, formData, leaderId, zone);
  };

  const updateProfile = (userId, payload) => {
    if (!userId) {
      console.error('CRITICAL ERROR: userId is missing or undefined!');
    }
    return executeRequest(updateProfileUser, userId, payload, leaderId, zone);
  };

  const updateDocuments = (userId, payload) => {
    if (!userId) {
      console.error('CRITICAL ERROR: userId is missing or undefined!');
    }
    return executeRequest(updateDocumentsUser, userId, payload, leaderId, zone);
  };

  return {
    createBasicAccount,
    updateProfile,
    updateDocuments,
    isLoading,
    error,
  };
};
