import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import IdentityFormFragment from '../fragments/IndentityFormFragment';
import Modal from '../components/ui/Modal';
import { useAuth } from '../features/auth/useAuth';
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
      onConfirm: () => navigate('/user-dashboard', { replace: true }),
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleOnSubmit = async (formData) => {
    setIsLoading(true);

    if (!userId) {
      setIsLoading(false);
      showErrorModal('Sesi login tidak valid silahkan login kembali');
      return;
    }
    try {
      const response = await axios.post(
        'https://simak-api.vercel.app/api/update_profile.php',
        {
          usr_id: userId,
          ...formData,
          is_completed: true,
        },
      );

      if (response.data?.status === 'error') {
        showErrorModal(response.data?.message || 'Gagal memperbarui profile');
        return;
      }

      completeIdentity();
      localStorage.removeItem(`identity_form_draft_${userId || 'guest'}`);

      showSuccessModal();
    } catch (error) {
      showErrorModal(
        error.response?.data?.message || 'Terjadi Kesalahan Sistem',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-sea-green-800 pb-12 pt-4">
      <IdentityFormFragment onSubmit={handleOnSubmit} isLoading={isLoading} />

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
