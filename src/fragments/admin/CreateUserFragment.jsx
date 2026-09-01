import { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from '../../components/ui/global/Modal';
import CreateUser from '../../components/admin/CreateUser';
import TitlePage from '../../components/ui/global/TitlePage';
import { bgImage } from '../../utils/bgImage';
import { useUserManagement } from '../../hooks/admin/useUsermanagement';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

// Cloudinary variabel
const CLOUD_NAME = 'llp0te3a';
const UPLOAD_PRESET = 'simak_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const CreateUserFragment = () => {
  const navigate = useNavigate();
  const { createBasicAccount, updateProfile, updateDocuments, isLoading } =
    useUserManagement();

  const [currentStep, setCurrentStep] = useState(1);
  const [createdUserId, setCreatedUserId] = useState(null);

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
      onConfirm: null,
    });
  };

  const showSuccessModal = (title, description, onConfirmAction) => {
    setModal({
      isOpen: true,
      title: title,
      description: description,
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => {
        closeModal();
        if (onConfirmAction) onConfirmAction();
      },
    });
  };

  // STEP 1 HANDLER: CREATE BASIC ACCOUNT
  const handleStep1Submit = async (data) => {
    try {
      // send step 1 basic account data to backend
      const result = await createBasicAccount(data);
      if (result?.user_id || result?.id) {
        const userId = result.user_id || result.id;
        // store the newly generated user id
        setCreatedUserId(userId);
        showSuccessModal(
          'Akun berhasil dibuat',
          'Akun dasar berhasil dibuat. Lanjut melengkapi biodata profil.',
          () => {
            closeModal();
            // transition screen to step 2 automatically
            setCurrentStep(2);
          },
        );
      }
    } catch (err) {
      showErrorModal(err.message);
    }
  };

  // STEP 2 HANDLER: UPDATE PROFILE BIODATA
  const handleStep2Submit = async (data) => {
    try {
      let imageUrl = data.profileImage;

      // if profile image is a file

      if (data.profileImage instanceof File) {
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', data.profileImage);
        cloudinaryForm.append('upload_preset', UPLOAD_PRESET);
        const cloudRes = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: cloudinaryForm,
        });

        const cloudData = await cloudRes.json();

        if (!cloudRes.ok || !cloudData.secure_url) {
          throw new Error(
            cloudData?.error?.message ||
              'Gagal mengunggah foto profil ke Cloudinary.',
          );
        }
        // AMBIL SECURE URL DARI CLOUDINARY
        imageUrl = cloudData.secure_url;
      }

      const finalPayload = {
        ...data,
        profileImage: imageUrl,
      };

      // pass created user id and payload to step 2 api
      await updateProfile(createdUserId, finalPayload);
      showSuccessModal(
        'Dokumen Berhasil di lengkapi',
        'Profil jamaah berhasil diperbarui. Lanjut melengkapi birokrasi.',
        () => {
          closeModal();
          // transition screen to step 3 automatically
          setCurrentStep(3);
        },
      );
    } catch (err) {
      showErrorModal(err.message);
    }
  };

  // STEP 3 HANDLER: UPDATE BUREAUCRACY & DOCUMENTS
  const handleStep3Submit = async (data) => {
    try {
      // send final step bureaucracy payload
      await updateDocuments(createdUserId, data);
      showSuccessModal(
        'Dokumen Berhasil di lengkapi',
        'Seluruh data jamaah berhasil diselesaikan!',
        () => {
          closeModal();
          navigate('/admin/users');
        },
      );
    } catch (err) {
      showErrorModal(err.message);
    }
  };

  return (
    <>
      <TitlePage
        bgImage={bgImage.bgAqsa}
        title="Pendaftaran Jamaah Baru"
        subtitle="Silakan isi data di bawah ini untuk membuat akses jamaah baru. Nomor porsi yang didaftarkan akan digunakan untuk verifikasi login."
      />

      <CreateUser
        currentStep={currentStep}
        createdUserId={createdUserId}
        isLoading={isLoading}
        onStep1Submit={handleStep1Submit}
        onStep2Submit={handleStep2Submit}
        onStep3Submit={handleStep3Submit}
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
};

export default CreateUserFragment;
