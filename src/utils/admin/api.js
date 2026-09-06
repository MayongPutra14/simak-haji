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

export const getUserDetail = async (userId) => {
  if (!userId) return null;

  try {
    const response = await api.post('get_profile.php', {
      user_id: userId,
      action: 'get_jamaah',
    });

    return response.data?.data || null;
  } catch (error) {
    console.error('Failed to get jamaah profile:', error);
    throw new Error('Gagal mengambil data profil jamaah', { cause: error });
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
    const bodyPayload = {
      usr_id: String(userId),
      user_id: String(userId),
      ...payload,
    };

    const response = await api.post('update_profile.php', bodyPayload);

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

export const updateUserProfile = async (userId, formData) => {
  if (!userId || !formData) return null;

  try {
    const bodyPayload = {
      user_id: userId,
      action: 'edit_users',
      ...formData,
    };

    const response = await api.post('admin_manage.php', bodyPayload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal update profil jamaah');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating users data:', error);
    throw error;
  }
};
