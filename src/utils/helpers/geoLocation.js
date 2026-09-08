/**
 * GET COORDINATE USER
 * @param {number} timeoutMs - TIME LIMIT
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getUserLocation = (timeoutMs = 7000) => {
  return new Promise((resolve, reject) => {
    // CHECKIN IS BROWSER SUPPORT LOCATION FEATURE
    if (!navigator.geolocation) {
      return reject({
        code: 'NOT_SUPPORTED',
        message: 'Browser Anda tidak mendukung fitur akses lokasi (GPS).',
      });
    }

    const options = {
      enableHighAccuracy: true,
      timeout: timeoutMs,
      maximumAge: 0,
    };

    const handleSuccess = (position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    };

    const handleError = (error) => {
      // TYPE ERRORS
      switch (error.code) {
      case error.PERMISSION_DENIED:
        reject({
          code: 'PERMISSION_DENIED',
          message:
              'Akses lokasi ditolak. Mohon izinkan akses GPS pada browser Anda.',
        });
        break;
      case error.POSITION_UNAVAILABLE:
        reject({
          code: 'POSITION_UNAVAILABLE',
          message:
              'Informasi lokasi tidak tersedia. Pastikan GPS/Location service perangkat Anda telah aktif.',
        });
        break;
      case error.TIMEOUT:
        reject({
          code: 'TIMEOUT',
          message:
              'Waktu pencarian lokasi habis. Mohon pastikan sinyal/GPS Anda kuat lalu coba lagi.',
        });
        break;
      default:
        reject({
          code: 'UNKNOWN_ERROR',
          message: 'Terjadi kesalahan tidak diketahui saat mengambil lokasi.',
        });
        break;
      }
    };

    // FINDING LOCATION
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options,
    );
  });
};

/**
 * Calculating two location
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // ROUND EARTH (JARI JARI BUMI)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // RESULT IN METER
};
