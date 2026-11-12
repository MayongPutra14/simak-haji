import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLeaderUsersData = async (leaderId, zone) => {
  try {
    const response = await api.post('leader.php', {
      action: 'get_users_list',
      leader_id: leaderId,
      zone: zone,
    });

    if (!response.data) {
      throw new Error('Data jamaah tidak ditemukan');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching leader users data:', error);
    throw error;
  }
};

export const getLeaderUserDetail = async (userId, leaderId, zone) => {
  if (!userId) return null;

  try {
    const response = await api.post('leader.php', {
      action: 'get_user_detail',
      user_id: userId,
      leader_id: leaderId,
      zone: zone,
    });

    return response.data?.data || null;
  } catch (error) {
    console.error('Failed to get jamaah profile:', error);
    throw new Error('Gagal mengambil data profil jamaah', { cause: error });
  }
};

export const leaderCreateBasicAccount = async (formData, leaderId, zone) => {
  if (!formData) return null;
  try {
    const payload = {
      action: 'create_user',
      leader_id: leaderId,
      zone: zone,
      ...formData,
    };

    const response = await api.post('leader.php', payload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal membuat akun baru');
    }

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Gagal membuat akun baru';

    console.error('Error creating user account:', errorMessage);

    throw new Error(errorMessage, {
      cause: error,
    });
  }
};

// update on create user account
export const leaderUpdateProfile = async (userId, payload, leaderId, zone) => {
  if (!userId || !payload) return null;
  try {
    const bodyPayload = {
      user_id: String(userId),
      action: 'update_user_profile',
      leader_id: leaderId,
      zone: zone,
      ...payload,
    };

    const response = await api.post('leader.php', bodyPayload);

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

export const leaderUpdateDocuments = async (
  userId,
  payload,
  leaderId,
  zone,
) => {
  if (!userId || !payload) return null;
  try {
    const bodyPayload = {
      user_id: userId,
      action: 'update_document',
      leader_id: leaderId,
      zone: zone,
      isCompleted: 1,
      ...payload,
    };

    const response = await api.post('leader.php', bodyPayload);
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

// edit user
export const leaderUpdateUserProfile = async (
  userId,
  formData,
  leaderId,
  zone,
) => {
  if (!userId || !formData) return null;

  try {
    const bodyPayload = {
      action: 'edit_user',
      user_id: userId,
      leader_id: leaderId,
      zone_leader: zone,
      ...formData,
    };

    console.log(bodyPayload);
    const response = await api.post('leader.php', bodyPayload);
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

export const leaderDeleteUserData = async (userId, leaderId, zone) => {
  if (!userId || !leaderId) {
    return null;
  }

  try {
    const payload = {
      action: 'delete_user',
      user_id: userId,
      leader_id: leaderId,
      zone: zone,
    };
    const response = await api.post('leader.php', payload);
    if (
      response.data?.status === 'failed' ||
      response.data?.status === 'error'
    ) {
      throw new Error(response.data?.message || 'Gagal menghapus data jamaah');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting users data:', error);
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
