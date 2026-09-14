import { useState, useEffect } from 'react';

export const useEventTimer = (endTime) => {
  const [timeLeft, setTimeLeft] = useState('--:--:--');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!endTime) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft('00:00:00');
        return true;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      );
      return false;
    };

    const isDone = calculateTime();
    if (isDone) return;

    const timer = setInterval(() => {
      const shouldClear = calculateTime();
      if (shouldClear) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return { timeLeft, isExpired };
};
