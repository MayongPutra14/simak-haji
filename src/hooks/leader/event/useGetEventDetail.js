import { useState, useEffect } from 'react';
import { leaderGetEventDetailAPI } from '../../../utils/leader/api';

export const useGetEventDetail = (eventId, leaderId, zone) => {
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
        const response = await leaderGetEventDetailAPI(eventId, leaderId, zone);
        if (isSubscribed && response) {
          setEventData(response.data);
        }
      } catch (error) {
        if (isSubscribed) {
          const message =
            error.response?.data?.message ||
            error.message ||
            'Gagal mengambil data event';

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
  }, [eventId, leaderId, zone]);

  return {
    eventData,
    isLoading,
    error,
  };
};
