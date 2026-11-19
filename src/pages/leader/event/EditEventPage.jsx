import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import EditEvent from '../../../components/leader/event/EditEvent';
import { useAuth } from '../../../features/auth/useAuth';
import { useUpdateEvent } from '../../../hooks/leader/event/useUdpateEvent';
import Modal from '../../../components/ui/global/Modal';
import { useModal } from '../../../hooks/global/useModal';
import { IconCheck, IconClose } from '../../../utils/helpers/decorations';

function EditEventFragment({ children }) {
  return <>{children}</>;
}
export default function LeaderEditEventPage() {
  const { eventId } = useParams();
  const { user } = useAuth();
  const { id: userId, zone } = user || {};
  const navigate = useNavigate();
  const { eventData, isLoading, getEventData, updateEventData } =
    useUpdateEvent();
  const { modal, closeModal, showModal } = useModal();

  useEffect(() => {
    if (eventId) {
      getEventData(eventId, userId, zone);
    }
  }, [eventId, getEventData, userId, zone]);

  function showSuccessModal() {
    showModal({
      title: 'Update Berhasil',
      description:
        'Event berhasil diperbarui, silahkan cek dibagian detail event',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => {
        closeModal();
        navigate('/leader/events');
      },
    });
  }

  function showErrorModal(message) {
    showModal({
      title: 'Update Gagal',
      description: message,
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-700 text-white',
      onConfirm: null,
    });
  }

  async function handleSave(formDataPayload) {
    try {
      const response = await updateEventData(
        eventId,
        formDataPayload,
        user?.id,
        user?.zone,
      );

      if (response?.status === 'success' || response?.status === 200) {
        showSuccessModal();
      } else {
        showErrorModal('Gagal memperbarui data event, silahkan coba lagi');
      }
    } catch (error) {
      showErrorModal(error.message);
    }
  }

  function handleCancel() {
    navigate('/leader/events');
  }

  return (
    <EditEventFragment>
      <EditEvent
        zone={zone}
        initialData={eventData}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        description={modal.description}
        icon={modal.icon}
        iconColor={modal.iconColor}
        iconBgColor={modal.iconBgColor}
        buttonColor={modal.buttonColor}
        buttonText="Tutup"
        onClose={modal.onConfirm || closeModal}
      />
    </EditEventFragment>
  );
}
