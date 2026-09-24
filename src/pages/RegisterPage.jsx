import { useState } from 'react';
import { useNavigate } from 'react-router';
import RegisterFormFragment from '../fragments/RegisterFragment';
import Modal from '../components/ui/global/Modal';
import { useRegister } from '../hooks/global/useRegister';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useRegister();
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
      title: 'Registrasi Gagal',
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
      title: 'Registrasi Berhasil',
      description: 'Silahkan masuk untuk mengakses dashboard',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => navigate('/login'),
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleRegister = async (data) => {
    const response = await register(data);

    if (response.status === 'success') {
      showSuccessModal();
    } else {
      showErrorModal(response.message);
    }
  };

  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <RegisterFormFragment onSubmit={handleRegister} />

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
    </section>
  );
};

export default RegisterPage;
