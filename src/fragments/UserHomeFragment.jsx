import QRcodeUser from '../components/ui/QRcodeUser';
import EventUser from '../components/ui/EventUser';
import { useDashboardEvent } from '../features/eventsDashboard/useDashboardEvent';

const UserHomeFragment = ({ user }) => {
  const qrHash = user?.qr_code_hash || 'INVALID';

  const { eventData, isLoading } = useDashboardEvent(user?.id);

  const handleActionClick = () => {
    if (eventData) {
      alert(`Membuka detail event: ${eventData.nama_event}`);
    }
  };

  return (
    <>
      <QRcodeUser qrValue={qrHash} />

      <EventUser
        eventData={eventData}
        isLoading={isLoading}
        onActionClick={handleActionClick}
      />
    </>
  );
};

export default UserHomeFragment;
