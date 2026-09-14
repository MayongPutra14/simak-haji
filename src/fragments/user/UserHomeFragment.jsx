import EventDashboard from '../../components/user/EventDashboard';
import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';
import FeatureHubContainer from '../../components/ui/global/FeatureHubMenu';
import Modal from '../../components/ui/global/Modal';
import { useEventDashboard } from '../../hooks/user/useEventDashboard';

const UserHomeFragment = ({ user }) => {
  const { modalConfig, handleActionClick, closeModal } =
    useEventDashboard(user);
  const eventData = {
    id: 6,
    eventName: 'Bagaimana mempersiapkan diri untuk Sai',
    venue: 'Jln Pegangsaan Timur No 56',
    speaker: 'Gilang Mayong Saputra S.Tr',
    eventTime: '2026-08-30 16:00:00',
    status: 'live',
    eventType: 'umum',
    targetZone: null,
    qrHash: 'EVT-01b5a2d225',
    latitude: '-6.39982900',
    longitude: '107.47522000',
    radius: 100,
    isAttended: 0,
  };
  const isLoading = false;

  return (
    <>
      <PrayTimesWidget />
      <FeatureHubContainer />

      <EventDashboard
        eventData={eventData}
        isLoading={isLoading}
        onActionClick={handleActionClick}
      />

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        description={modalConfig.description}
        buttonText={modalConfig.buttonText}
        onConfirm={modalConfig.onConfirm}
        showCancelButton={modalConfig.showCancelButton}
        cancelButtonText={modalConfig.cancelButtonText}
        onCancel={closeModal}
      />
    </>
  );
};

export default UserHomeFragment;
