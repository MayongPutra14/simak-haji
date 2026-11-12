import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useModal } from '../../global/useModal';
import {
  getLeaderUserDetail,
  leaderUpdateUserProfile,
} from '../../../utils/leader/api';

// CLOUDINARY CONFIGURATION
const CLOUD_NAME = 'llp0te3a';
const UPLOAD_PRESET = 'simak_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export default function useLeaderEditUser(leaderId, zone) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { modal, showModal, closeModal } = useModal();

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function showErrorModal(errorMessage) {
    showModal({
      isOpen: true,
      title: 'Update Gagal',
      description:
        errorMessage || 'Terjadi kesalahan sistem. Silahkan coba lagi nanti.',
      icon: 'close',
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: null,
    });
  }

  // FETCH INITIAL USER PROFILE DATA
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getLeaderUserDetail(userId, leaderId, zone);
        if (data) setInitialData(data);
      } catch (err) {
        console.error('Gagal memuat profil jamaah:', err);
        setError(err.message || 'Gagal memuat data');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchData();
  }, [userId, leaderId, zone]);

  // SAVE / UPDATE PROFILE HANDLER
  async function handleSave(payload, rawImageFile) {
    if (!userId) {
      showErrorModal('ID user tidak ditemukan');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const finalPayload = { ...payload };
      delete finalPayload.profileImage;

      // Upload new image to Cloudinary if provided as a File instance
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

      await leaderUpdateUserProfile(userId, finalPayload, leaderId, zone);
      navigate('/leader/users');
    } catch (err) {
      setError(err.message || 'Gagal memperbarui data profil');
      showErrorModal(err.message || 'Gagal memperbarui data profil');
    } finally {
      setIsLoading(false);
    }
  }

  // CANCEL HANDLER
  function handleCancel() {
    navigate(-1);
  }

  return {
    initialData,
    isLoading,
    error,
    modal,
    closeModal,
    handleSave,
    handleCancel,
  };
}
