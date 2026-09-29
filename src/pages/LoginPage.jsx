import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../features/auth/useAuth';
import LoginFormFragment from '../fragments/LoginFormFragment';
import Modal from '../components/ui/global/Modal';
import { IoCloseOutline as IconClose } from 'react-icons/io5';
import { useLogin } from '../hooks/user/useLogin';
import BgFormLogReg from '../assets/images/decorations/mekah.webp';
import { motion } from 'motion/react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { mutateLogin } = useLogin();

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
      const result = await mutateLogin(data);

      if (result && result.status === 'success') {
        const userData = result.data;

        authLogin(userData);

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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4">
      {/* Background Image */}
      <motion.div
        initial={{ filter: 'blur(20px)', scale: 1.1, opacity: 0.4 }}
        animate={{ filter: 'blur(0px)', scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BgFormLogReg})` }}
      />

      {/* Dark & Gradient Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 bg-linear-to-b from-slate-950/80 via-emerald-950/50 to-slate-950/80" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full ">
        <LoginFormFragment onSubmit={handleLogin} />
      </div>

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
}
