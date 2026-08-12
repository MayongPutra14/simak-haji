import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import LoginFormFragment from '../fragments/LoginFormFragment';
import Modal from '../components/ui/Modal';
import { IoCloseOutline as IconClose } from 'react-icons/io5';

const LoginPage = () => {
  const navigate = useNavigate();

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
      formData.append('nomor_porsi', data.posrsiNumber);
      formData.append('password', data.password);

      const response = await axios.post(
        'https://simak-api.vercel.app/api/login.php',
        formData,
      );

      if (response.data.status === 'success') {
        const userData = response.data.data;

        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dasboard');
        }
      } else {
        showErrorModal(response.data.message);
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
