import axios from 'axios';

// const BASE_URL = 'https://simak-api.my.id/api/';
const BASE_URL = 'http://localhost/simak_api/api/';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginApi = async (user) => {
  try {
    const payload = {
      nomor_porsi: user.porsiNumber,
      password: user.password,
    };

    const response = await api.post('login.php', payload);
    return response.data;
  } catch (error) {
    return {
      status: 'failed',
      message: error.response?.data?.message || 'Login gagal.',
    };
  }
};

export const registerAPI = async (data) => {
  if (!data)
    return {
      status: 'failed',
      message: 'Mohon untuk mengisi data terlebih dahulu',
    };

  try {
    const bodyPayload = {
      nama: data.name,
      nomor_porsi: data.porsiNumber,
      whatsapp: data.whatsappNumber,
      password: data.password,
    };

    const response = await api.post('register.php', bodyPayload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      return {
        status: 'failed',
        message:
          response.data?.message ||
          'Pendaftaran akun gagal, silahkan coba lagi',
      };
    }

    return {
      status: 'success',
      message: response.data?.message || 'Akun berhasil dibuat.',
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan pada server.';

    return {
      status: 'error',
      message: errorMessage,
    };
  }
};

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
  const response = await api.post('update_profile.php', payload, {
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
    const response = await api.post('get_profile.php', {
      user_id: userId,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};

export const getScheduleDashboard = async (userId) => {
  if (!userId) throw new Error('User ID tidak ditemukan');
  try {
    const response = await api.post('get_dashboard_event.php', {
      user_id: userId,
    });

    if (response.status === 'error' || response.status === 'failed') {
      throw new Error('Terjadi error ketika mengambil data acara');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Terjadi kesalahan jaringan.', {
      cause: error,
    });
  }
};

export const getSchedules = async (userId) => {
  if (!userId) throw new Error('User ID tidak ditemukan');
  try {
    const response = await api.post('get_jadwal.php', {
      user_id: userId,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    throw new Error('Gagal mengambil jadwal', { cause: error });
  }
};

export const updatePasswordAPI = async (userId, newPassword) => {
  if (!userId || !newPassword) {
    return {
      status: 'failed',
      message: 'ID user atau password baru tidak boleh kosong.',
    };
  }

  try {
    const bodyPayload = {
      user_id: userId,
      newPassword: newPassword,
    };

    const response = await api.post(
      'user.php?action=update-password',
      bodyPayload,
    );
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      return {
        status: 'failed',
        message: response.data?.message || 'Gagal memperbarui password.',
      };
    }

    return {
      status: 'success',
      message: response.data?.message || 'Password berhasil diperbarui.',
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan pada server.';

    return {
      status: 'error',
      message: errorMessage,
    };
  }
};
