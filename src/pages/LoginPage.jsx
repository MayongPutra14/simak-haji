import { useNavigate } from 'react-router';
import { LoginFormFragment } from '../fragments/LoginFormFragment';
import { useState } from 'react';
import { Modal } from '../components/ui/Modal';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

export const LoginPage = ({ setIsAuthenticated = () => {} }) => {
  // const navigate = useNavigate();

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    icon: null,
    iconBgColor: '',
    iconColor: '',
    buttonColor: '',
  });

  const showErrorModal = (errorMessage) => {
    setModal({
      isOpen: true,
      title: 'Terjadi error',
      description: errorMessage || 'Sistem sedang sibuk. Mohon coba lagi nanti',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500',
    });
  };

  const showSuccesModal = () => {
    setModal({
      isOpen: true,
      title: 'Login Berhasil',
      description: 'Silahkan masuk untuk mengakses dashboard',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500',
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleLogin = async (data) => {
    try {
      console.log('Simulasi data login:', data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (data.password === 'salah123') {
        throw new Error(
          'Nomor Porsi atau Password yang Anda masukkan tidak valid.',
        );
      }

      const mockToken = 'mock-user-authentication-token-12345';
      localStorage.setItem('token', mockToken);

      setIsAuthenticated(true);
      showSuccesModal();
    } catch (error) {
      console.error('Error saat login:', error);
      showErrorModal(error?.message || 'Terjadi Kesalahan Sistem');
    }
  };

  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <LoginFormFragment onSubmit={handleLogin} />

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        description={modal.description}
        icon={modal.icon}
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonText="Oke"
        buttonColor={modal.buttonColor}
      />
    </section>
  );
};
