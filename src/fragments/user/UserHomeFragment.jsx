import EventDashboard from '../../components/user/EventDashboard';
import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';
import FeatureHubContainer from '../../components/ui/global/FeatureHubMenu';
import Modal from '../../components/ui/global/Modal';
import { useEventDashboard } from '../../hooks/user/useEventDashboard';

const UserHomeFragment = ({ user }) => {
  const { eventData, modalConfig, isLoading, handleActionClick, closeModal } =
    useEventDashboard(user);

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
