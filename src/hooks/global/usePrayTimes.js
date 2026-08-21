import { useState, useEffect } from 'react';
import { fetchPraySchedules } from '../../utils/client/islamicAPI';

export const usePrayTimes = (
  provinsi = 'JAWA BARAT',
  kabkota = 'Kab. Karawang',
) => {
  const [schedules, setSchedules] = useState(null);
  const [nextPrayer, setNextPrayer] = useState({
    name: '',
    time: '',
    targetDate: null,
  });
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [todayTimes, setTodayTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch data from API
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const jadwalData = await fetchPraySchedules(provinsi, kabkota);
        if (isMounted) setSchedules(jadwalData);
      } catch (err) {
        if (isMounted)
          setError(err.message || 'Terjadi kesalahan saat memuat jadwal');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [provinsi, kabkota]);

  // Define the prayer time today and the next prayer time.
  useEffect(() => {
    if (!schedules || schedules.length === 0) return;

    const updatePrayerTarget = () => {
      const now = new Date();
      const currentDay = now.getDate();

      const todayData =
        schedules.find((item) => parseInt(item.tanggal) === currentDay) ||
        schedules[0];

      if (!todayData) return;

      const prayerList = [
        { name: 'Subuh', time: todayData.subuh },
        { name: 'Dzuhur', time: todayData.dzuhur },
        { name: 'Ashar', time: todayData.ashar },
        { name: 'Maghrib', time: todayData.maghrib },
        { name: 'Isya', time: todayData.isya },
      ];

      setTodayTimes(prayerList);

      let upcoming = null;
      for (const prayer of prayerList) {
        if (!prayer.time) continue;
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerDate = new Date(now);
        prayerDate.setHours(hours, minutes, 0, 0);

        if (prayerDate > now) {
          upcoming = {
            name: prayer.name,
            time: prayer.time,
            targetDate: prayerDate,
          };
          break;
        }
      }

      // If Isya has ended, change to the next Subuh tomorrow .
      if (!upcoming) {
        const tomorrowData = schedules.find(
          (item) => parseInt(item.tanggal) === currentDay + 1,
        );
        const subuhTime = tomorrowData ? tomorrowData.subuh : todayData.subuh;
        const [hours, minutes] = subuhTime.split(':').map(Number);

        const tomorrowSubuh = new Date(now);
        tomorrowSubuh.setDate(now.getDate() + 1);
        tomorrowSubuh.setHours(hours, minutes, 0, 0);

        upcoming = {
          name: 'Subuh',
          time: subuhTime,
          targetDate: tomorrowSubuh,
        };
      }

      setNextPrayer(upcoming);
    };

    updatePrayerTarget();
    const interval = setInterval(updatePrayerTarget, 60000);
    return () => clearInterval(interval);
  }, [schedules]);

  // 3. Engine Countdown Timer
  useEffect(() => {
    if (!nextPrayer.targetDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextPrayer.targetDate - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const pad = (num) => String(num).padStart(2, '0');
        setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer]);

  return { loading, error, nextPrayer, timeLeft, todayTimes };
};
