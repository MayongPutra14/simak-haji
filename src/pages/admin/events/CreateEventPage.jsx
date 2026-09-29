import { useState } from 'react';
import { useNavigate } from 'react-router';
import CreateEventFragment from '../../../fragments/admin/events/CreateEventFragment';
import Modal from '../../../components/ui/global/Modal';
// import { useEventManagement } from '../../../hooks/admin/event/useEventManagement';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

export default function CreateEventPage() {
  const navigate = useNavigate();
  // const { executeCreateEvent } = useEventManagement();
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

  const showErrorModal = () => {
    setModal({
      isOpen: true,
      title: 'Event Gagal Dibuat',
      description: 'Silahkan Coba Lagi.',
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
      title: 'Event Berhasil Dibuat',
      description: 'Silahkan kembali untuk melihat event tersebut',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => navigate('/admin/schedules'),
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleOnSubmit = async (formData) => {
    const formattedDateTime = `${formData.eventDate} ${formData.eventTime}:00`;

    const payload = {
      action: 'create_event',
      nama_event: formData.eventName,
      deskripsi_event: formData.description,
      tempat: formData.venue,
      pembicara: formData.speaker,
      jenis_event: formData.eventCategory,
      zona_target:
        formData.eventCategory === 'umum' ? null : formData.targetZone,
      waktu_event: formattedDateTime,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      radius: parseInt(formData.radius, 10),
    };

    const result = await executeCreateEvent(payload);
    if (result.success) {
      showSuccessModal();
    } else {
      showErrorModal();
    }
  };

  return (
    <section>
      <CreateEventFragment onSubmit={handleOnSubmit} />

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
