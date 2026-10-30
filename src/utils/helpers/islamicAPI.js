import axios from 'axios';

/**
 * Utility To get the prayer time schedule from API equran.id
 * @param {string} provinsi - Provinsi name (example: 'JAWA BARAT')
 * @param {string} kabkota - Nama regency/city (example: 'Kab. Karawang')
 * @returns {Promise<Array>} An array of schedules in a month.
 */

const islamicAPI = axios.create({
  baseURL: 'https://equran.id',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchPraySchedules = async (
  provinsi = 'JAWA BARAT',
  kabkota = 'Kab. Karawang',
) => {
  try {
    const payload = {
      provinsi,
      kabkota,
    };
    const response = await islamicAPI.post('/api/v2/shalat', payload);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = response.data;

    if (result.code === 200 && result.data?.jadwal) {
      return result.data.jadwal;
    }

    throw new Error(result.message || 'Gagal mengambil data jadwal shalat');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error in fetchPraySchedules:', errorMessage);
    throw new Error(errorMessage, { cause: error });
  }
};

export const getSurahsListAPI = async () => {
  const response = await islamicAPI.get('https://equran.id/api/surat');

  return response.data;
};

export const getSurahByIdAPI = async (surahId) => {
  if (!surahId)
    return {
      status: 'failed',
      message: 'ID surat tidak dimukan, silahkan coba lagi',
    };

  const response = await islamicAPI.get(
    `https://equran.id/api/surat/${surahId}`,
  );

  return response.data;
};

const hadithAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// GET HADITH BOOKS API SERVICE
export const getHadithBooksAPI = async () => {
  const response = await hadithAPI.get('user.php', {
    params: { action: 'get_hadith_books' },
  });

  return response.data;
};

// SEARCH HADITH API SERVICE
export const searchHadithAPI = async (
  query,
  kitab = '',
  page = 1,
  limit = 5,
) => {
  const trimmedQuery = query ? query.trim() : '';
  const isNumeric = /^\d+$/.test(trimmedQuery);

  // ALLOW NUMERIC INPUT OR MINIMUM 3 CHARACTERS FOR TEXT
  if (!trimmedQuery || (trimmedQuery.length < 3 && !isNumeric)) {
    return {
      status: 'failed',
      message:
        'Kata kunci pencarian minimal harus 3 karakter atau masukkan nomor hadis.',
    };
  }

  const response = await hadithAPI.post('user.php', {
    action: 'search_hadith',
    q: query,
    kitab: kitab,
    page: page,
    limit: limit,
  });

  return response.data;
};

// GET HADITH BY KITAB
export const getHadithByKitabAPI = async (kitab = '', page = 1, limit = 5) => {
  if (page < 1) {
    return {
      status: 'failed',
      message: 'Nomor halaman tidak boleh kurang dari nol atau minus',
    };
  }

  const response = await hadithAPI.post('user.php', {
    action: 'get_hadith_by_books',
    kitab: kitab,
    page: page,
    limit: limit,
  });

  return response.data;
};
