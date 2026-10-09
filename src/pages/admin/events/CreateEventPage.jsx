import CreateEvent from '../../../components/admin/events/CreateEvent';
import CreateEventFragment from '../../../fragments/admin/events/CreateEventFragment';
import Modal from '../../../components/ui/global/Modal';
import { useNavigate } from 'react-router';
import { useCreateEvent } from '../../../hooks/admin/event/useCreateEvent';
import { useModal } from '../../../hooks/global/useModal';
import { IconCheck, IconClose } from '../../../utils/helpers/decorations';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { executeCreateEvent } = useCreateEvent();
  const { modal, closeModal, showModal } = useModal();

  function showSuccessModal() {
    showModal({
      isOpen: true,
      title: 'Event Berhasil Dibuat',
      description: 'Silahkan kembali untuk melihat event tersebut',
      icon: <IconCheck className="w-7 h-7" />,
      iconBgColor: 'bg-sea-green-100',
      iconColor: 'text-sea-green-400',
      buttonColor: 'bg-sea-green-500 hover:bg-sea-green-700 text-white',
      onConfirm: () => {
        closeModal();
        navigate('/admin/events');
      },
    });
  }

  function showErrorModal() {
    showModal({
      isOpen: true,
      title: 'Event Gagal Dibuat',
      description: 'Silahkan Coba Lagi.',
      icon: <IconClose className="w-7 h-7" />,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-400',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      onConfirm: null,
    });
  }

  async function handleOnSubmit(payload) {
    try {
      const result = await executeCreateEvent(payload);

      if (result?.status === 'success' || result?.success) {
        showSuccessModal(result.message || 'Event berhasil ditambahkan!');
      } else {
        showErrorModal(result.message || 'Gagal menambahkan event.');
      }
    } catch (error) {
      showErrorModal(error.message || 'Terjadi kesalahan sistem.');
    }
  }

  return (
    <section>
      <CreateEventFragment>
        <CreateEvent onSubmit={handleOnSubmit} />

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
      </CreateEventFragment>
    </section>
  );
}
