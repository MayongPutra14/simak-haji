import { useState, useEffect } from 'react';
import { getLandingContentAPI } from '../../../utils/admin/api';

export function useGetLandingContent() {
  const [landingData, setLandingData] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const getLandingData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getLandingContentAPI();
        if (isSubscribed && response) {
          setLandingData(response.data);
        }
      } catch (error) {
        if (isSubscribed) {
          const errMsg =
            error.response?.data?.message ||
            error.message ||
            'Gagal mengambil konten lading page';

          setError(errMsg);
          setLandingData(null);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    getLandingData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return {
    landingData,
    isloading,
    error,
  };
}
