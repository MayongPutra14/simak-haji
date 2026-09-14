import { useState, useEffect } from 'react';
import { fetchMateriData } from '../../utils/user/materiService';

export const useMateriData = (materiId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchMateriData(materiId);
        setData(response);
      } catch (err) {
        setError(err.message || 'Gagal memuat data materi');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [materiId]);

  return { data, loading, error };
};
