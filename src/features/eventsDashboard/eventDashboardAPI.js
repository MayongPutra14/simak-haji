import axios from 'axios';

const BASE_URL = 'https://simak-api.vercel.app/api';

/**
 * take the nearest event to user dashboard
 * @param {number|string} userId - ID form credential user
 * @returns {Promise<Object>} Data event from the API
 */

export const getDashboardEvent = async (userId) => {
  const response = await axios.post(`${BASE_URL}/get_dashboard_event.php`, {
    user_id: userId,
  });

  return response.data;
};
