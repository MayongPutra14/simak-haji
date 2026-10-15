import { useState, useEffect, useCallback } from 'react';

// GEOLOCATION HOOK
export default function useGeolocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // REQUEST USER LOCATION
  const getLocation = useCallback(() => {
    // check if geolocation is supported by browser
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // fetch current GPS coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setIsLoading(false);
      },
      (geoError) => {
        // handle permission denied or positioning failure
        switch (geoError.code) {
        case geoError.PERMISSION_DENIED:
          setError(
            'Gagal mengakses lokasi. Silakan aktifkan izin akses lokasi pada browser Anda.',
          );
          break;
        case geoError.POSITION_UNAVAILABLE:
          setError('Informasi lokasi tidak tersedia saat ini.');
          break;
        case geoError.TIMEOUT:
          setError('Waktu permintaan lokasi habis. Silakan coba lagi.');
          break;
        default:
          setError('Terjadi kesalahan lokasi yang tidak diketahui.');
          break;
        }
        setIsLoading(false);
      },

      {
        enableHighAccuracy: true, // enable high accuracy for precise attendance verification
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { location, error, isLoading, refreshLocation: getLocation };
}
