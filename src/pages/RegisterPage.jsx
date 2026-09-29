import { useState } from 'react';
import { useNavigate } from 'react-router';
import RegisterFormFragment from '../fragments/RegisterFragment';
import Modal from '../components/ui/global/Modal';
import { useRegister } from '../hooks/global/useRegister';
import { motion } from 'motion/react';
import BgFormLogReg from '../assets/images/decorations/mekah.webp';
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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 pb-8">
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

      <div className="relative z-10 w-full ">
        <RegisterFormFragment onSubmit={handleRegister} />
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
};

export default RegisterPage;
