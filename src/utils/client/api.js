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
    throw new Error('Sesi login tidak valid, silahkan login kembali.');

  // PREPARE MULTIPART FORM DATA
  const payload = new FormData();

  // ATTACH MANDATORY PARAMETERS
  payload.append('user_id', userId);
  payload.append('is_completed', 'true');

  // APPEND FORM DATA FIELDS TO PAYLOAD
  Object.keys(formData).forEach((key) => {
    const value = formData[key];
    if (value !== null && value !== undefined) {
      payload.append(key, value);
    }
  });

  // SEND MULTIPART REQUEST
  const response = await api.post('/update_profile.php', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

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
    const response = await api.post('/get_profile.php', {
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
