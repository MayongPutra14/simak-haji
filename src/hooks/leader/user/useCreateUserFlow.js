import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLeaderUserManagement } from './useUserManagement';
import { useModal } from '../../global/useModal';
import {
  createUserSession,
  getUserSession,
  deleteUserSession,
} from '../../../utils/helpers/sessionStorage';

// CLOUDINARY CONFIGURATION
const CLOUD_NAME = 'llp0te3a';
const UPLOAD_PRESET = 'simak_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const useLeaderCreateUserFlow = (leaderId, zone) => {
  const navigate = useNavigate();
  const { modal, showModal, closeModal } = useModal();
  const { createBasicAccount, updateProfile, updateDocuments, isLoading } =
    useLeaderUserManagement(leaderId, zone);

  // STATE MANAGEMENT
  const [createdUserId, setCreatedUserId] = useState(() => {
    const { userId } = getUserSession();
    return userId;
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const { step } = getUserSession();
    return step;
  });

  function showErrorModal(message) {
    showModal({
      isOpen: true,
      title: 'Akun Gagal Dibuat',
      description:
        message || 'Gagal mendaftarkan jamaah baru. Periksa kembali data Anda.',
      icon: 'close',
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-500',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: null,
    });
  }

  function showSuccessModal(title, description, onConfirmAction) {
    showModal({
      isOpen: true,
      title: title,
      description: description,
      icon: 'check',
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => {
        closeModal();
        if (onConfirmAction) onConfirmAction();
      },
    });
  }

  // CANCEL PROCESS HANDLER
  function handleCancelProcess() {
    deleteUserSession();
    navigate('/leader/users');
  }

  // STEP 1 HANDLER: CREATE BASIC ACCOUNT
  async function handleStep1Submit(data) {
    try {
      // send step 1 basic account data to backend
      const result = await createBasicAccount(data);
      if (result?.data?.user_id) {
        const userId = result.data.user_id;

        // store the newly generated user id
        setCreatedUserId(userId);
        setCurrentStep(2);
        createUserSession(userId, 2);

        showSuccessModal(
          'Akun berhasil dibuat',
          'Akun dasar berhasil dibuat. Lanjut melengkapi biodata profil.',
          () => {
            closeModal();
          },
        );
      }
    } catch (err) {
      showErrorModal(err.message);
    }
  }

  // STEP 2 HANDLER: UPDATE PROFILE BIODATA
  async function handleStep2Submit(data) {
    try {
      let imageUrl = data.profileImage;

      // upload profile image to cloudinary if profile image is a file instance
      if (data.profileImage instanceof File) {
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', data.profileImage);
        cloudinaryForm.append('upload_preset', UPLOAD_PRESET);
        const cloudRes = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: cloudinaryForm,
        });

        const cloudData = await cloudRes.json();

        if (!cloudRes.ok || !cloudData.secure_url) {
          throw new Error(
            cloudData?.error?.message ||
              'Gagal mengunggah foto profil ke Cloudinary.',
          );
        }

        // get secure url from cloudinary response
        imageUrl = cloudData.secure_url;
      }

      const finalPayload = {
        ...data,
        profileImage: imageUrl,
      };

      // pass created user id and payload to step 2 api
      await updateProfile(createdUserId, finalPayload);

      setCurrentStep(3);
      createUserSession(createdUserId, 3);

      showSuccessModal(
        'Dokumen Berhasil di lengkapi',
        'Profil jamaah berhasil diperbarui. Lanjut melengkapi birokrasi.',
        () => {
          closeModal();
        },
      );
    } catch (err) {
      showErrorModal(err.message);
    }
  }

  // STEP 3 HANDLER: UPDATE BUREAUCRACY & DOCUMENTS
  async function handleStep3Submit(data) {
    try {
      // send final step bureaucracy payload
      await updateDocuments(createdUserId, data);
      showSuccessModal(
        'Dokumen Berhasil di lengkapi',
        'Seluruh data jamaah berhasil diselesaikan!',
        () => {
          closeModal();
          deleteUserSession();
          navigate('/admin/users');
        },
      );
    } catch (err) {
      showErrorModal(err.message);
    }
  }

  return {
    currentStep,
    createdUserId,
    isLoading,
    modal,
    closeModal,
    handleCancelProcess,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
  };
};
