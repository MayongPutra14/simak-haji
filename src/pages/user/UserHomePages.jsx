import FeatureHubContainer from '../../components/ui/global/FeatureHubMenu';
import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';
import EventDashboard from '../../components/user/EventDashboard';
import { useAuth } from '../../features/auth/useAuth';
import UserHomeFragment from '../../fragments/user/UserHomeFragment';
import { useDashboardEvent } from '../../hooks/user/useDashboardEvent';

const UserHomePage = () => {
  const { user } = useAuth();
  const { eventData, isLoading } = useDashboardEvent(user?.id);

  return (
    <UserHomeFragment>
      <PrayTimesWidget />
      <FeatureHubContainer />

      <EventDashboard eventData={eventData} isLoading={isLoading} />
    </UserHomeFragment>
  );
};

export default UserHomePage;
