import { useState, useEffect } from 'react';
import { getEventDetailAPI } from '../../../utils/admin/api';

export const useGetEventDetail = (eventId) => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!eventId) {
      return;
    }

    let isSubscribed = true;

    const fetchEventDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getEventDetailAPI(eventId);
        if (isSubscribed && response) {
          setEventData(response.data);
        }
      } catch (error) {
        if (isSubscribed) {
          const message =
            error.response?.data?.message ||
            error.message ||
            'Gagal menghapus event';

          setError(message);
          setEventData(null);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchEventDetail();

    return () => {
      isSubscribed = false;
    };
  }, [eventId]);

  return {
    eventData,
    isLoading,
    error,
  };
};
