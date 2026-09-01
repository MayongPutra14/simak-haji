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

export const deleteAdminUserData = async (userId) => {
  if (!userId) {
    return null;
  }

  try {
    const payload = {
      action: 'delete_user',
      user_id: userId,
    };
    const response = await api.post('admin_manage.php', payload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal membuat akun baru');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting users data:', error);
    throw error;
  }
};

export const createBasicAccount = async (formData) => {
  if (!formData) return null;
  try {
    const payload = {
      action: 'create_user',
      ...formData,
    };
    const response = await api.post('admin_manage.php', payload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal membuat akun baru');
    }

    return response.data;
  } catch (error) {
    console.error('Error creating user account:', error);
    throw error;
  }
};

export const updateProfile = async (userId, payload) => {
  if (!userId || !payload) return null;
  try {
    const formData = new FormData();
    formData.append('usr_id', String(userId));
    formData.append('user_id', String(userId)); // Tambahkan fallback key

    Object.keys(payload).forEach((key) => {
      if (payload[key] !== null && payload[key] !== undefined) {
        formData.append(key, payload[key]);
      }
    });

    const response = await api.post('update_profile.php', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal memperbarui profil');
    }
    return response.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message || error.message;
    throw new Error(serverMessage, { cause: error });
  }
};

export const updateDocuments = async (userId, payload) => {
  if (!userId || !payload) return null;
  try {
    const bodyPayload = {
      user_id: userId,
      action: 'update_dokumen',
      is_completed: 1,
      ...payload,
    };

    const response = await api.post('manage_dokumen.php', bodyPayload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal memperbarui dokumen');
    }
    return response.data;
  } catch (error) {
    console.error('Error updating documents:', error);
    throw error;
  }
};
