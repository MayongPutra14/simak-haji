import axios from 'axios';

const BASE_URL = 'https://simak-api.vercel.app/api';

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
