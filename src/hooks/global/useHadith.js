import { useCallback, useEffect, useRef, useState } from 'react';
import {
  searchHadithAPI,
  getHadithBooksAPI,
  getHadithByKitabAPI,
} from '../../utils/helpers/islamicAPI';

export function useSearchHadith() {
  // STATE MANAGEMENT FOR HADITH SEARCH
  const [hadithData, setHadithData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // RESET SEARCH STATE BACK TO INITIAL
  const clearSearch = () => {
    setHadithData(null);
    setError(null);
    setIsLoading(false);
  };

  // FUNCTION TO TRIGGER SEARCH MANUALLY
  const searchHadith = async (query, kitab = '', page = 1, limit = 5) => {
    const trimmedQuery = query?.trim() || '';

    // IF QUERY IS EMPTY, RESET SEARCH STATE TO SHOW BOOKS COLLECTION AGAIN
    if (!trimmedQuery) {
      clearSearch();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchHadithAPI(query, kitab, page, limit);

      if (response.status === 'success') {
        setHadithData(response.data);
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mencari hadis.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    hadithData,
    isLoading,
    error,
    searchHadith,
    clearSearch,
  };
}

export const useGetHadithBooks = () => {
  const [hadithBooks, setHadithData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchHadithBooks = async () => {
      setIsloading(true);
      setError(null);

      try {
        const response = await getHadithBooksAPI();
        if (isSubscribed && response.status === 'success') {
          setHadithData(response.data.data);
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

    fetchHadithBooks();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return {
    hadithBooks,
    isLoading,
    error,
  };
};

export function useHadithByKitab(kitabSlug, initialPage = 1, limit = 5) {
  // STATE MANAGEMENT
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [prevSlug, setPrevSlug] = useState(kitabSlug);
  const [hadithData, setHadithData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // RESET PAGE STATE DURING RENDER IF SLUG CHANGED (PREVENTS CASCADING RENDERS)
  if (prevSlug !== kitabSlug) {
    setPrevSlug(kitabSlug);
    setCurrentPage(1);
  }

  // IN-MEMORY CACHE REF TO PERSIST DATA ACROSS RERENDERS
  const cacheRef = useRef(new Map());

  // FETCH HADITH DATA HANDLER
  const fetchHadith = useCallback(
    async (pageToFetch) => {
      if (!kitabSlug) return;

      const cacheKey = `${kitabSlug}-page-${pageToFetch}-limit-${limit}`;

      // check if requested data exists in cache
      if (cacheRef.current.has(cacheKey)) {
        setHadithData(cacheRef.current.get(cacheKey));
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getHadithByKitabAPI(
          kitabSlug,
          pageToFetch,
          limit,
        );

        if (response.status === 'success') {
          // store data in cache and set state
          cacheRef.current.set(cacheKey, response.data);
          setHadithData(response.data);
        } else {
          throw new Error(response.message || 'Gagal mengambil data hadis.');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan jaringan.');
      } finally {
        setIsLoading(false);
      }
    },
    [kitabSlug, limit],
  );

  // SINGLE EFFECT TO FETCH DATA WHEN SLUG OR PAGE CHANGES
  useEffect(() => {
    fetchHadith(currentPage);
  }, [currentPage, fetchHadith]);

  // PAGINATION HANDLERS
  const totalPages = hadithData?.total_pages || 1;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (hasPrevPage) setCurrentPage((prev) => prev - 1);
  };

  const refetch = () => {
    // clear specific key from cache on manual retry
    const cacheKey = `${kitabSlug}-page-${currentPage}-limit-${limit}`;
    cacheRef.current.delete(cacheKey);
    fetchHadith(currentPage);
  };

  return {
    hadithData,
    hadiths: hadithData?.hadiths || [],
    currentPage,
    totalPages,
    totalHadiths: hadithData?.total || 0,
    isLoading,
    error,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    setCurrentPage,
    refetch,
  };
}
