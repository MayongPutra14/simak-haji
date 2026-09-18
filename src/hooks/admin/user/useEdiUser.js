import { useState, useCallback } from 'react';
import * as api from '../../../utils/admin/api';

const CLOUD_NAME = 'llp0te3a';
const UPLOAD_PRESET = 'simak_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function useEditUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(async (apiFunc, ...arg) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFunc(...arg);
      return data;
    } catch (error) {
      setError(error.message || 'Terjadi kesalahan sistem');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserProfile = useCallback(
    (userId) => {
      return executeRequest(api.getUserDetail, userId);
    },
    [executeRequest],
  );

  const updateProfileUser = useCallback(
    async (userId, payload, rawImageFile) => {
      if (!userId) {
        throw new Error('ID user tidak ditemukan');
      }

      setIsLoading(true);
      setError(null);

      try {
        const finalPayload = { ...payload };
        delete finalPayload.profileImage;

        // Proses upload ke Cloudinary jika ada file gambar baru
        if (rawImageFile instanceof File) {
          const cloudinaryForm = new FormData();
          cloudinaryForm.append('file', rawImageFile);
          cloudinaryForm.append('upload_preset', UPLOAD_PRESET);

          const cloudRes = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: cloudinaryForm,
          });
          const cloudData = await cloudRes.json();

          if (!cloudRes.ok || !cloudData.secure_url) {
            throw new Error('Gagal mengunggah foto profil baru.');
          }

          finalPayload.profileImage = cloudData.secure_url;
        }

        const data = await api.updateUserProfile(userId, finalPayload);
        return data;
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan sistem');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { getUserProfile, updateProfileUser, isLoading, error };
}
