import { useEffect, useState } from 'react';
import { getLeaderUserDetail } from '../../../utils/leader/api';

const useGetUserDetail = (userId, leaderId, zone) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId || !leaderId) {
      return;
    }

    let isSubscribed = true;

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getLeaderUserDetail(userId, leaderId, zone);
        if (isSubscribed && response) {
          setUserData(response);
        }
      } catch (error) {
        if (isSubscribed) {
          setError(error?.message || 'Gagal mengambil data profil');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };
    fetchUserProfile();

    return () => {
      isSubscribed = false;
    };
  }, [userId, leaderId, zone]);

  return { userData, isLoading, error };
};

export default useGetUserDetail;
