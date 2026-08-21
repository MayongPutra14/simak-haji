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
