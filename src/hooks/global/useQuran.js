import { useEffect, useState } from 'react';
import {
  getSurahsListAPI,
  getSurahByIdAPI,
} from '../../utils/helpers/islamicAPI';

export const useSurahs = () => {
  const [surahs, setSurahDatas] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchSurahs = async () => {
      setIsloading(true);
      setError(null);

      try {
        const response = await getSurahsListAPI();
        if (isSubscribed && response.length > 0) {
          setSurahDatas(Array.isArray(response) ? response : []);
        }
      } catch (error) {
        if (isSubscribed) {
          setError(error.message || 'Gagal mengambil daftar surat');
        }
      } finally {
        if (isSubscribed) {
          setIsloading(false);
        }
      }
    };

    fetchSurahs();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return {
    surahs,
    isLoading,
    error,
  };
};

export const useSurahById = (surahId) => {
  const [surahData, setSurahData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchSurahById = async () => {
      setIsloading(true);
      setError(null);

      try {
        const response = await getSurahByIdAPI(surahId);
        if (isSubscribed && response) {
          setSurahData(response);
        }
      } catch (error) {
        if (isSubscribed) {
          setError(error.message || `Gagal menagmbil surat ke ${surahId}`);
        }
      } finally {
        setIsloading(false);
      }
    };

    fetchSurahById();

    return () => {
      isSubscribed = false;
    };
  }, [surahId]);

  return {
    surahData,
    isLoading,
    error,
  };
};
