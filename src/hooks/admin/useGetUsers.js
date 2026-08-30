import { useState, useEffect, useCallback } from 'react';
import { getAdminUsersData } from '../../utils/admin/adminAPI';

export default function useAdminUsersData({ adminId } = {}) {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(() => Boolean(adminId));
  const [error, setError] = useState(null);

  // REFETCH FUNCTION IF ADMIN ADD NEW OR DELETE DATA
  const refetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAdminUsersData();
      if (response?.status === 'success') {
        const formattedData = (response.data || []).map((user) => ({
          id: user.id,
          avatar: user.foto,
          name: user.nama_lengkap,
          portionNumber: user.nomor_porsi,
          phone: user.nomor_telepon,
          status: user.status === 'aktif' ? 'Aktif' : 'Alumni',
        }));
        setUsersData(formattedData);
      }
    } catch (err) {
      setError(err?.message || 'Gagal mengambil data jamaah');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // FIRST CALLING API
  useEffect(() => {
    if (!adminId) return;

    let isSubscribed = true;

    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAdminUsersData();
        // ONLY UPDATE WHEN USER STILL ACTIVE (subscribed)
        if (isSubscribed && response?.status === 'success') {
          const formattedData = (response.data || []).map((user) => ({
            id: user.id,
            avatar: user.foto,
            name: user.nama_lengkap,
            portionNumber: user.nomor_porsi,
            phone: user.nomor_telepon,
            status: user.status === 'aktif' ? 'Aktif' : 'Alumni',
          }));
          setUsersData(formattedData);
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err?.message || 'Gagal mengambil data jamaah');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    loadInitialData();

    // CLEANEUP FUNCTION IF COMMPONENT UNMOUNTED BEFORE API CALLED
    return () => {
      isSubscribed = false;
    };
  }, [adminId]);

  return {
    usersData,
    setUsersData,
    isLoading,
    error,
    refetch: refetchData,
  };
}
