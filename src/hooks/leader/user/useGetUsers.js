import { useState, useEffect, useCallback } from 'react';
import { getLeaderUsersData } from '../../../utils/leader/api';

export default function useLeaderUsersData({ leaderId, zone }) {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(() => Boolean(leaderId));
  const [error, setError] = useState(null);

  // REFETCH FUNCTION IF ADMIN ADD NEW OR DELETE DATA
  const refetchData = useCallback(async () => {
    if (!leaderId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getLeaderUsersData(leaderId, zone);
      if (response?.status === 'success') {
        setUsersData(response.data);
      }
    } catch (err) {
      setError(err?.message || 'Gagal mengambil data jamaah');
    } finally {
      setIsLoading(false);
    }
  }, [leaderId, zone]);

  // FIRST CALLING API
  useEffect(() => {
    if (!leaderId) return;

    let isSubscribed = true;

    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getLeaderUsersData(leaderId, zone);
        // ONLY UPDATE WHEN USER STILL ACTIVE (subscribed)
        if (isSubscribed && response?.status === 'success') {
          setUsersData(response.data);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err?.message || 'Gagal mengambil data jamaah');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    loadInitialData();

    // CLEANEUP FUNCTION IF COMMPONENT UNMOUNTED BEFORE API CALLED
    return () => {
      isSubscribed = false;
    };
  }, [leaderId, zone]);

  return {
    usersData,
    setUsersData,
    isLoading,
    error,
    refetch: refetchData,
  };
}
