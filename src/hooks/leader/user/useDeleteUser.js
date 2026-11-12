import { useState } from 'react';
import { leaderDeleteUserData } from '../../../utils/leader/api';

export default function useLeaderDeleteUser(leaderId, zone) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteUser = async (userId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await leaderDeleteUserData(userId, leaderId, zone);
      return response;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Gagal menghapus data pengguna.';

      setDeleteError(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteUser,
    isDeleting,
    deleteError,
    setDeleteError,
  };
}
