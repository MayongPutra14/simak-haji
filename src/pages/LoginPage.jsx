import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../features/auth/useAuth';
import LoginFormFragment from '../fragments/LoginFormFragment';
import Modal from '../components/ui/global/Modal';
import { IoCloseOutline as IconClose } from 'react-icons/io5';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

  const showErrorModal = (message) => {
    setModal({
      isOpen: true,
      title: 'Login Gagal',
      description:
        message || 'Nomor Porsi atau Password yang Anda masukkan salah.',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-500',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: closeModal,
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
      const formData = new FormData();
      formData.append('nomor_porsi', data.porsiNumber);
      formData.append('password', data.password);

      const response = await axios.post(
        'https://simak-api.vercel.app/api/login.php',
        formData,
      );

      const result = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      if (result && result.status === 'success') {
        const userData = result.data;

        login(userData);

        if (userData.role === 'admin') {
          navigate('/admin/home');
        } else {
          navigate('/user/home');
        }
      } else {
        showErrorModal(result?.message || 'Login Gagal');
      }
    } catch (error) {
      console.error('Internal Server Error', error);
      showErrorModal(
        error.response?.data?.message ||
          'Terjadi kesalahan jaringan atau server. Coba lagi nanti.',
      );
    }
  };

  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <LoginFormFragment onSubmit={handleLogin} />
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

export default LoginPage;
