import { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from '../../components/ui/global/Modal';
import CreateUser from '../../components/admin/CreateUser';
import TitlePage from '../../components/ui/global/TitlePage';
import { bgImage } from '../../utils/bgImage';
import { useCreateUser } from '../../hooks/admin/useCreateUser';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

const CreateUserFragment = () => {
  const navigate = useNavigate();
  const { submitUserData, isLoading, error } = useCreateUser();
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
  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const showErrorModal = (message) => {
    setModal({
      isOpen: true,
      title: 'Akun Gagal Dibuat',
      description:
        message || 'Gagal mendaftarkan jamaah baru. Periksa kembali data Anda.',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-500',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: closeModal,
    });
  };

  const showSuccessModal = () => {
    setModal({
      isOpen: true,
      title: 'Akun Berhasil Dibuat',
      description: 'Silahkan masuk untuk mengakses dashboard',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => navigate('/admin/user'),
    });
  };

  const handleSubmit = async (data) => {
    try {
      // Capture the return value from submitUserData
      const result = await submitUserData(data);

      // Check the API response structure (e.g., result.status or result.success)
      if (result?.status === 'success' || result?.status === 'ok') {
        showSuccessModal();
      } else {
        showErrorModal(result?.message);
      }
    } catch (err) {
      console.error('Failed to submit:', err);
      // Capture the error message thrown from the hook or API
      showErrorModal(err.message);
    }
  };

  return (
    <>
      {error && (
        <div className="p-4 mb-4 text-white bg-red-500 rounded">{error}</div>
      )}

      <TitlePage
        bgImage={bgImage.bgAqsa}
        title="Pendaftaran Jamaah Baru"
        subtitle="Silakan isi data di bawah ini untuk membuat akses jamaah baru. Nomor porsi yang didaftarkan akan digunakan untuk verifikasi login."
      />

      <CreateUser onSubmitHandler={handleSubmit} isLoading={isLoading} />

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onConfirm || closeModal}
        title={modal.title}
        description={modal.description}
        icon={modal.icon}
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonText="Tutup"
        buttonColor={modal.buttonColor}
      />
    </>
  );
};

export default CreateUserFragment;
