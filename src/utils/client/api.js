import axios from 'axios';

const BASE_URL = 'https://simak-api.vercel.app/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * update profile/user identity
 * @param {string|number} userId
 * @param {Object} formData
 */

export const updateProfileIdentity = async (userId, formData) => {
  if (!formData)
    throw new Error(
      'Login session is not valid, please tyr againSesi login tidak valid, silahkan login kembali.',
    );

  const payload = {
    user_id: userId,
    ...formData,
    is_completed: true,
  };

  const response = await api.post('/update_profile.php', payload);
  if (response?.status === 'failed' || response?.status === 'error') {
    throw new Error(response.data?.message || 'Gagal memperbarui profile');
  }

  return response.data;
};

export const getUserGlobalProfile = () => {
  const globalProfile = localStorage.getItem('user');
  if (!globalProfile) return null;

  try {
    return JSON.parse(globalProfile);
  } catch (error) {
    console.error('Error fetching global data:', error);
    return globalProfile;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/get_profile.php`, {
      user_id: userId,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};

export const getSchedules = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/get_jadwal.php`, {
      user_id: userId,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return null;
  }
};

// ADMIN
export const getAdminUsersData = async () => {
  try {
    const response = await api.post(`${BASE_URL}/admin_manage.php`, {
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
