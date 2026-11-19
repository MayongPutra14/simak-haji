import { useAuth } from '../../features/auth/useAuth';
import { api } from '../../utils/user/api';
import { ENDPOINT_BY_ROLE } from '../../utils/helpers/constant';

export const useUpdatePassword = () => {
  // AUTH CONTEXT
  const { user } = useAuth();

  // API REQUEST HANDLER
  const updatePassword = async (userId, newPassword) => {
    // validate required parameters
    if (!userId || !newPassword) {
      return {
        status: 'failed',
        message: 'ID user atau password baru tidak boleh kosong.',
      };
    }

    // resolve target endpoint based on logged-in user role
    const endpoint = ENDPOINT_BY_ROLE[user?.role];

    if (!endpoint) {
      return {
        status: 'failed',
        message: 'Role pengguna tidak valid atau endpoint tidak ditemukan.',
      };
    }

    try {
      // construct unified request payload
      const bodyPayload = {
        action: 'update_password',
        user_id: userId,
        newPassword: newPassword,
      };

      // send post request to the role-specific endpoint
      const response = await api.post(endpoint, bodyPayload);

      // handle business logic failure from backend
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
      // extract server or network error message
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

  return { updatePassword };
};
