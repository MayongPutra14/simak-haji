import { useNavigate } from 'react-router';
import { useState } from 'react';
import IdentityFormFragment from '../../fragments/user/IndentityFormFragment';
import Modal from '../../components/ui/global/Modal';
import { useAuth } from '../../features/auth/useAuth';
import { updateProfileIdentity } from '../../utils/client/api';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

const IdentityPage = () => {
  const { user, completeIdentity } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user_data')) || {};
  const userId = currentUser.id || currentUser.data?.id || user?.id;

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    icon: null,
    iconBgColor: '',
    iconColor: '',
    buttonColor: '',
    onConfirm: null,
  });

  const showErrorModal = (errorMessage) => {
    setModal({
      isOpen: true,
      title: 'Gagal Mengirim Data',
      description:
        errorMessage || 'Terjadi kesalahan sistem. Silahkan coba lagi nanti.',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: null,
    });
  };

  const showSuccessModal = () => {
    setModal({
      isOpen: true,
      title: 'Pengisian Data Berhasil',
      description:
        'Terima kasih! Yuk, cek halaman profilmu untuk melihat data selengkapnya.',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => navigate('/user/home', { replace: true }),
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const CLOUD_NAME = 'llp0te3a';
  const UPLOAD_PRESET = 'simak_preset';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const handleOnSubmit = async (formData) => {
    setIsLoading(true);

    try {
      let imageUrl = formData.profileImage;

      // IF PROFILE IMAGE IS AN INSTANCE OF FILE, UPLOAD TO CLOUDINARY FIRST
      if (formData.profileImage instanceof File) {
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', formData.profileImage);
        cloudinaryForm.append('upload_preset', UPLOAD_PRESET);

        const cloudRes = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: cloudinaryForm,
        });

        const cloudData = await cloudRes.json();

        if (!cloudRes.ok || !cloudData.secure_url) {
          throw new Error(
            cloudData?.error?.message || 'Gagal mengunggah foto profil.',
          );
        }

        // ASSIGN CLOUDINARY SECURE URL
        imageUrl = cloudData.secure_url;
      }

      // PREPARE FINAL JSON PAYLOAD FOR BACKEND API
      const finalPayload = {
        ...formData,
        profileImage: imageUrl, // converted from file object to string url
      };

      // EXECUTE BACKEND PROFILE UPDATE API
      await updateProfileIdentity(userId, finalPayload);

      completeIdentity();
      localStorage.removeItem(`identity_form_draft_${userId || 'guest'}`);
      localStorage.removeItem('identity_form_draft_guest');

      showSuccessModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Terjadi kesalahan sistem.';

      showErrorModal(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-sea-green-800 pb-12 pt-4 min-h-screen">
      <IdentityFormFragment
        onSubmit={handleOnSubmit}
        isLoading={isLoading}
        userId={userId}
      />

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onConfirm || closeModal}
        title={modal.title}
        description={modal.description}
        icon={modal.icon}
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonColor={modal.buttonColor}
      />
    </section>
  );
};

export default IdentityPage;
