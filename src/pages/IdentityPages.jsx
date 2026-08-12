import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import IdentityFormFragment from '../fragments/IndentityFormFragment';
import Modal from '../components/ui/Modal';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

const IdentityPages = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      onConfirm: () => navigate('/user-dashboard'),
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleOnSubmit = async (fromData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost/simak_api/identity_register.php',
        fromData,
      );

      if (response.status === 'success') {
        showSuccessModal();
      }
    } catch (error) {
      showErrorModal(error.response?.message || 'Terjadi Kesalahan Sistem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
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

export default IdentityPages;
