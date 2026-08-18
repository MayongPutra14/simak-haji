import axios from 'axios';

const BASE_URL = 'https://simak-api.vercel.app/api';

export const getUserGlobalProfile = () => {
  const globalProfile = localStorage.getItem('user');
  if (!globalProfile) return null;

  try {
    return JSON.parse(globalProfile);
  } catch (_error) {
    return globalProfile;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_profile.php`);
    return response.data;
  } catch (_error) {
    return null;
  }
};
