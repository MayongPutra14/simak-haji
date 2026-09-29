import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import useEditUser from '../../../hooks/admin/user/useEdiUser';
import EditUser from '../../../components/admin/EditUser';
import Modal from '../../../components/ui/global/Modal';
import { IoCloseOutline as IconClose } from 'react-icons/io5';

export default function UserEditFragment() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const { getUserProfile, updateProfileUser, isLoading } = useEditUser();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile(userId);
        if (data) setInitialData(data);
      } catch (err) {
        console.error('Gagal memuat profil jamaah:', err);
      }
    };

    if (userId) fetchData();
  }, [userId, getUserProfile]);

  const showErrorModal = (errorMessage) => {
    setModal({
      isOpen: true,
      title: 'Update Gagal',
      description:
        errorMessage || 'Terjadi kesalahan sistem. Silahkan coba lagi nanti.',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: null,
    });
  };

  const handleSave = async (payload, rawImageFile) => {
    try {
      await updateProfileUser(userId, payload, rawImageFile);
      navigate('/admin/users');
    } catch (err) {
      showErrorModal(err.message || 'Gagal memperbarui data profil');
    }
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <EditUser
        initialData={initialData}
        onSave={handleSave}
        onCancel={handleCancel}
        IsLoading={isLoading}
      />

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
}
