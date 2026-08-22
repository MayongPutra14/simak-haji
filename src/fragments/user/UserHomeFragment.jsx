import EventDashboard from '../../components/user/EventUser';
import { useDashboardEvent } from '../../features/eventsDashboard/useDashboardEvent';
import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';
import FeatureHubContainer from '../../components/ui/global/FeatureHubMenu';

const UserHomeFragment = ({ user }) => {
  const { eventData, isLoading } = useDashboardEvent(user?.id);

  const handleActionClick = () => {
    if (eventData) {
      alert(`Membuka detail event: ${eventData.nama_event}`);
    }
  };

  return (
    <>
      <PrayTimesWidget />

      <FeatureHubContainer />

      <EventDashboard
        eventData={eventData}
        isLoading={isLoading}
        onActionClick={handleActionClick}
      />
    </>
  );
};

export default UserHomeFragment;
