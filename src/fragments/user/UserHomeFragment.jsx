import EventDashboard from '../../components/user/EventUser';
import { useDashboardEvent } from '../../features/eventsDashboard/useDashboardEvent';
import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';

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

      <EventDashboard
        eventData={eventData}
        isLoading={isLoading}
        onActionClick={handleActionClick}
      />
    </>
  );
};

export default UserHomeFragment;
