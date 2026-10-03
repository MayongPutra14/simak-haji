import { useState } from 'react';
import { useNavigate } from 'react-router';
import CreateEventFragment from '../../../fragments/admin/events/CreateEventFragment';
import Modal from '../../../components/ui/global/Modal';
import { useCreateEvent } from '../../../hooks/admin/event/useCreateEvent';
import {
  IoCloseOutline as IconClose,
  IoCheckmark as IconCheck,
} from 'react-icons/io5';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { executeCreateEvent } = useCreateEvent();
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
      onConfirm: () => navigate('/admin/events'),
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleOnSubmit = async (formData) => {
    const payload = new FormData();

    payload.append(
      'nama_event',
      formData.eventName || formData.nama_event || '',
    );
    payload.append(
      'deskripsi_event',
      formData.description || formData.deskripsi_event || '',
    );
    payload.append('tempat', formData.venue || formData.tempat || '');
    payload.append('pembicara', formData.speaker || formData.pembicara || '');
    payload.append(
      'jenis_event',
      formData.eventCategory || formData.jenis_event || 'umum',
    );

    const category = formData.eventCategory || formData.jenis_event;
    if (category === 'zona') {
      payload.append(
        'zona_target',
        formData.targetZone || formData.zona_target || '',
      );
    } else {
      payload.append('zona_target', '');
    }

    // Mapping DATE & TIME
    const datePart = formData.eventDate || '';
    const timePart = formData.eventTime || '';
    let formattedWaktuEvent = '';

    if (datePart && timePart) {
      formattedWaktuEvent = `${datePart} ${timePart}:00`;
    } else if (datePart) {
      formattedWaktuEvent = `${datePart} 00:00:00`;
    }

    payload.append('waktu_event', formattedWaktuEvent);
    payload.append('latitude', parseFloat(formData.latitude) || 0);
    payload.append('longitude', parseFloat(formData.longitude) || 0);
    payload.append('radius', parseInt(formData.radius, 10) || 100);

    if (formData.eventMaterial) {
      const rawFile = formData.eventMaterial;
      let fileToUpload = null;

      if (rawFile instanceof FileList && rawFile.length > 0) {
        fileToUpload = rawFile[0];
      } else if (rawFile instanceof File) {
        fileToUpload = rawFile;
      } else if (Array.isArray(rawFile) && rawFile[0] instanceof File) {
        fileToUpload = rawFile[0];
      }

      if (fileToUpload) {
        payload.append('materi_file', fileToUpload);
      }
    }

    const result = await executeCreateEvent(payload);
    if (result.status === 'success' || result.success) {
      showSuccessModal(result.message || 'Event berhasil ditambahkan!');
    } else {
      showErrorModal(result.message || 'Gagal menambahkan event.');
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
