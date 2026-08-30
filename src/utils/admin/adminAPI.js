import axios from 'axios';

const BASE_URL = 'https://simak-api.vercel.app/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAdminUsersData = async () => {
  try {
    const response = await api.post('admin_manage.php', {
      action: 'get_users',
    });

    if (!response.data) {
      throw new Error('Data jamaah tidak ditemukan');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching users data:', error);
    throw error;
  }
};

export const createAdminUsersData = async (formData) => {
  if (!formData) {
    throw new Error('Gagal membuat akun jamaah baru, data yang dikirim kosong');
  }

  try {
    const response = await api.post('/update_profile.php', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal membuat akun baru');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching users data:', error);
    throw error;
  }
};
