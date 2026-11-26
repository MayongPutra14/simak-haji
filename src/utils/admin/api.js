import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  // SEND PHPSESSID SO THE BACKEND CAN RESOLVE THE CALLER (CONTRACT 1.1)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAdminUsersData = async () => {
  try {
    const response = await api.post('admin.php', {
      action: 'get_users_list',
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
    const response = await api.post('admin.php', {
      user_id: userId,
      action: 'get_user_detail',
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

    const response = await api.post('admin.php', payload);
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
      user_id: String(userId),
      action: 'update_user_profile',
      ...payload,
    };

    const response = await api.post('admin.php', bodyPayload);

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
      action: 'update_document',
      isCompleted: 1,
      ...payload,
    };

    const response = await api.post('admin.php', bodyPayload);
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
    const response = await api.post('admin.php', payload);
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

export const updateQuotaProvince = async (payload) => {
  if (!payload)
    return {
      status: 'failed',
      message: 'Jumlah kuota tidak ada, pastikan anda meberikan nilainya',
    };

  try {
    const bodyPayload = {
      action: 'update_kuota',
      ...payload,
    };

    const response = await api.post('admin.php', bodyPayload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      return {
        status: 'failed',
        message: response.data?.message || 'Update kuota provinsi gagal',
      };
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message | 'Terjadi kesalahan pada server';

    return {
      status: 'error',
      message: errorMessage,
    };
  }
};

export const updateUserProfile = async (userId, formData) => {
  if (!userId || !formData) return null;

  try {
    const bodyPayload = {
      user_id: userId,
      action: 'edit_user',
      ...formData,
    };

    const response = await api.post('admin.php', bodyPayload);
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

// EVENT CRUD
export const createEventAPI = async (payload) => {
  if (!payload)
    return {
      status: 'failed',
      message:
        'Tidak dapat membuat event, pastikan data event terisi dengan baik.',
    };

  try {
    let finalPayload;
    let config = {};

    if (payload instanceof FormData) {
      finalPayload = payload;
      if (!finalPayload.has('action')) {
        finalPayload.append('action', 'create_event');
      }

      // Overwrite Header Content-Type agar Axios/Browser otomatis menyusun Multipart Boundary
      config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      finalPayload = {
        action: 'create_event',
        ...payload,
      };
    }

    const response = await api.post('admin.php', finalPayload, config);

    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      return {
        status: 'failed',
        message:
          response.data?.message || 'Gagal membuat event. Silahkan coba lagi',
      };
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan pada server';

    return {
      status: 'error',
      message: errorMessage,
    };
  }
};

export const getEventsAPI = async () => {
  const response = await api.post('admin.php', {
    action: 'get_events',
  });

  return response.data;
};

export const getEventDetailAPI = async (eventId) => {
  if (!eventId)
    return {
      status: 'failed',
      message: 'Id event tidak ditemukan',
    };

  const response = await api.post('admin.php', {
    id: Number(eventId),
    action: 'get_event_detail',
  });

  return response.data;
};

export const updateEventAPI = async (eventId, payload) => {
  if (!eventId || !payload) {
    return {
      status: 'failed',
      message:
        'Id event atau data event tidak ditemukan, pastikan anda mengisi data dengan benar',
    };
  }

  let bodyPayload;
  let config = {};
  if (payload instanceof FormData) {
    bodyPayload = payload;
    if (!bodyPayload.has('action')) {
      bodyPayload.append('action', 'update_event');
    }

    if (!bodyPayload.has('event_id')) {
      bodyPayload.append('event_id', `${eventId}`);
    }

    // Overwrite Header Content-Type agar Axios/Browser otomatis menyusun Multipart Boundary
    config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  } else {
    bodyPayload = {
      event_id: eventId,
      action: 'update_event',
      ...payload,
    };
  }

  const response = await api.post('admin.php', bodyPayload, config);

  return response.data;
};

export const deleteEventAPI = async (eventId) => {
  if (!eventId)
    return {
      status: 'failed',
      message: 'Id event tidak ditemukan',
    };

  const response = await api.post('admin.php', {
    id: Number(eventId),
    action: 'delete_event',
  });

  return response.data;
};

// LANDING PAGE

export const getLandingContentAPI = async () => {
  const response = await api.post('admin.php', {
    action: 'get_landing_content',
  });

  return response.data;
};

export const getLandingSectionAPI = async (sectionKey) => {
  const response = await api.post('admin.php', {
    action: 'get_landing_section',
    section_key: sectionKey,
  });

  return response.data;
};

export const updateLandingPageAPI = async (payload) => {
  if (!payload) {
    return {
      status: 'failed',
      message: 'Data tidak ada, silakan coba lagi',
    };
  }

  const bodyPayload = {
    action: 'update_landing_section',
    ...payload,
  };

  const response = await api.post('admin.php', bodyPayload);

  return response.data;
};

// ATTENDANCE RECAP (ADMIN) — SEE docs/api-contract-admin-leader-attendance.md
export const getAttendanceRecapAPI = async ({
  page = 1,
  perPage = 10,
  search = '',
  month = 'all',
  year = 'all',
  zone = 'all',
} = {}) => {
  const bodyPayload = {
    action: 'get_attendance_recap',
    page,
    per_page: perPage,
    search,
    month,
    year,
  };

  // ZONE IS ADMIN-ONLY AND OMITTED FOR "all" (CONTRACT 9.1)
  if (zone && zone !== 'all') {
    bodyPayload.zone = zone;
  }

  const response = await api.post('admin.php', bodyPayload);

  return response.data;
};

export const getEventAttendanceDetailAPI = async ({
  eventId,
  page = 1,
  perPage = 10,
  search = '',
  status = 'all',
  zone = 'all',
} = {}) => {
  if (!eventId) {
    return {
      status: 'failed',
      message: 'Kegiatan tidak ditemukan.',
    };
  }

  const bodyPayload = {
    action: 'get_event_attendance_detail',
    event_id: Number(eventId),
    page,
    per_page: perPage,
    search,
    status,
  };

  if (zone && zone !== 'all') {
    bodyPayload.zone = zone;
  }

  const response = await api.post('admin.php', bodyPayload);

  return response.data;
};

export const getJamaahAttendanceHistoryAPI = async ({
  userId,
  page = 1,
  perPage = 10,
  search = '',
  month = 'all',
  status = 'all',
} = {}) => {
  if (!userId) {
    return {
      status: 'failed',
      message: 'Data jamaah tidak ditemukan.',
    };
  }

  const response = await api.post('admin.php', {
    action: 'get_jamaah_attendance_history',
    user_id: Number(userId),
    page,
    per_page: perPage,
    search,
    month,
    status,
  });

  return response.data;
};
