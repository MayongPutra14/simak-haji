// CUSTOM HOOK TO VALIDATE USER ACCESS TO EVENT MATERIAL

import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getScheduleDashboard } from '../../utils/user/api';

/**
 * custom hook to validate user access to event material
 * @param {string|number} userId
 * @returns {object} access state including isLoading, isAllowed, eventData, and errorMessage
 */
export const useMaterialAccess = (userId) => {
  const { id: eventId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    // VALIDATE MATERIAL ACCESS ELIGIBILITY
    const validateAccess = async () => {
      // check if event id exists in url parameters
      if (!eventId) {
        if (isMounted) {
          setIsLoading(false);
          setIsAllowed(false);
          setErrorMessage('Event ID is missing.');
        }
        return;
      }

      // check if user id exists
      if (!userId) {
        if (isMounted) {
          setIsLoading(false);
          setIsAllowed(false);
          setErrorMessage('User ID tidak ditemukan.');
        }
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage('');

        // fetch event detail from backend with both user id and event id
        const response = await getScheduleDashboard(userId, eventId);
        const data = response.data;

        if (!data) {
          throw new Error('Event data not found.');
        }

        const eventStatus = String(data?.status || '').toLowerCase();
        const isLive = eventStatus === 'live';
        const hasAttended = Boolean(data?.isAttended);

        // EVALUATE STRICT ACCESS CONDITIONS
        if (isLive && hasAttended) {
          if (isMounted) {
            setEventData(data);
            setIsAllowed(true);
          }
        } else {
          if (isMounted) {
            setIsAllowed(false);
            setErrorMessage(
              !isLive
                ? 'Material is only accessible during live events.'
                : 'You must complete attendance via QR before accessing material.',
            );
          }
        }
      } catch (error) {
        if (isMounted) {
          setIsAllowed(false);
          setErrorMessage(
            error.message || 'Failed to validate material access.',
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    validateAccess();

    return () => {
      isMounted = false;
    };
  }, [eventId, userId]);

  return { isLoading, isAllowed, eventData, errorMessage, eventId };
};
