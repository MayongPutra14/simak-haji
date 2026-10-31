import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getDoaByCategory,
  getDoaCategoriesAPI,
  searchDoaByQueryAPI,
} from '../../utils/helpers/islamicAPI';

// SEARCH DOA HOOK
export function useSearchDoa() {
  // STATE MANAGEMENT FOR DOA SEARCH
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // RESET SEARCH STATE BACK TO INITIAL
  const clearSearch = () => {
    setSearchResults(null);
    setError(null);
    setIsLoading(false);
  };

  // FUNCTION TO TRIGGER DOA SEARCH MANUALLY
  const searchDoa = async (query = '', limit = 5) => {
    const trimmedQuery = query ? query.trim() : '';

    // reset state if query is empty
    if (!trimmedQuery) {
      clearSearch();
      return;
    }

    // set loading state before api request
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchDoaByQueryAPI(trimmedQuery, limit);

      // handle successful response
      if (response?.status === 'success') {
        setSearchResults(response.data?.data || response.data || []);
      } else {
        setSearchResults(response || []);
      }
    } catch (err) {
      // handle search request failure
      setError(err.message || 'Terjadi kesalahan saat mencari doa.');
    } finally {
      // ensure loading state is closed
      setIsLoading(false);
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    searchDoa,
    clearSearch,
  };
}

// FETCH DOA CATEGORIES HOOK
export const useGetDoaCategories = () => {
  // STATE MANAGEMENT
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // track subscription state to prevent memory leaks on unmounted components
    let isSubscribed = true;

    const fetchCategories = async () => {
      // reset state before requesting data
      setIsLoading(true);
      setError(null);

      try {
        const response = await getDoaCategoriesAPI();

        // set state only if component is still mounted
        if (isSubscribed) {
          if (response?.status === 'success') {
            setCategories(response.data.data || response.data);
          } else {
            setCategories(response || []);
          }
        }
      } catch (err) {
        // handle api request failure
        if (isSubscribed) {
          setError(err.message || 'Gagal mengambil data category');
        }
      } finally {
        // ensure loading state is closed
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    // cleanup function to prevent state update on unmounted component
    return () => {
      isSubscribed = false;
    };
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
};

// GET DOA BY CATEGORY HOOK
export function useDoaByCategory(categorySlug, initialPage = 1, limit = 5) {
  // STATE MANAGEMENT
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [prevSlug, setPrevSlug] = useState(categorySlug);
  const [doaData, setDoaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // RESET PAGE STATE DURING RENDER IF SLUG CHANGED
  if (prevSlug !== categorySlug) {
    setPrevSlug(categorySlug);
    setCurrentPage(1);
  }

  // IN-MEMORY CACHE REF TO PERSIST DATA ACROSS RERENDERS
  const cacheRef = useRef(new Map());

  // FETCH DOA DATA HANDLER
  const fetchDoa = useCallback(
    async (pageToFetch) => {
      // skip execution if category slug is empty
      if (!categorySlug) return;

      const cacheKey = `${categorySlug}-page-${pageToFetch}-limit-${limit}`;

      // check if requested data exists in cache
      if (cacheRef.current.has(cacheKey)) {
        setDoaData(cacheRef.current.get(cacheKey));
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await getDoaByCategory(
          categorySlug,
          pageToFetch,
          limit,
        );

        if (response?.status === 'success') {
          // store data in cache and update state
          cacheRef.current.set(cacheKey, response.data);
          setDoaData(response.data);
        } else {
          throw new Error(response?.message || 'Gagal mengambil data doa.');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan jaringan.');
      } finally {
        setIsLoading(false);
      }
    },
    [categorySlug, limit],
  );

  // SINGLE EFFECT TO FETCH DATA WHEN SLUG OR PAGE CHANGES
  useEffect(() => {
    fetchDoa(currentPage);
  }, [currentPage, fetchDoa]);

  // PAGINATION HANDLERS & DATA CALCULATIONS
  const totalDoa = doaData?.total || 0;
  const totalPages = Math.ceil(totalDoa / limit) || 1;
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
    const cacheKey = `${categorySlug}-page-${currentPage}-limit-${limit}`;
    cacheRef.current.delete(cacheKey);
    fetchDoa(currentPage);
  };

  return {
    doaData,
    category: doaData?.kategori || null,
    doas: doaData?.doa || [],
    currentPage,
    totalPages,
    totalDoa,
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
