import { useEffect, useState } from 'react';
import { getUserDetail } from '../../../utils/admin/api';

const useGetUserDetail = (userId) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isSubscribed = true;

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getUserDetail(userId);
        if (isSubscribed && response?.status === 'success') {
          setUserData(response.data);
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
  }, [userId]);

  return { userData, isLoading, error };
};

export default useGetUserDetail;
