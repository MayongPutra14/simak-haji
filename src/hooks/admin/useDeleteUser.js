import { useState } from 'react';
import { deleteAdminUserData } from '../../utils/admin/adminAPI';

export default function useDeleteAdminUser() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteUser = async (userId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await deleteAdminUserData(userId);
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
