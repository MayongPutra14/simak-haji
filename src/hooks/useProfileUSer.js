import { useState, useEffect } from 'react';
import { getUserProfile } from '../utils/api';

const useProfileUser = (userId) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsloading] = useState(() => Boolean(userId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let isSubscribed = true;

    const fetchProfileData = async () => {
      setIsloading(true);
      setError(null);

      try {
        const response = await getUserProfile(userId);
        if (isSubscribed && response?.status === 'success') {
          setProfileData(response.data);
        }
      } catch (error) {
        if (isSubscribed) {
          setError(error?.message || 'Gagal mengambil data profil');
        }
      } finally {
        if (isSubscribed) {
          setIsloading(false);
        }
      }
    };
    fetchProfileData();

    return () => {
      isSubscribed = false;
    };
  }, [userId]);

  return { profileData, isLoading, error };
};

export default useProfileUser;
