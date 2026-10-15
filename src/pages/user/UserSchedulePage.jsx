import UserScheduleFragment from '../../fragments/user/UserScheduleFragment';
import { useAuth } from '../../features/auth/useAuth';
import useSchedulesEvent from '../../hooks/user/useSchedules';
import EventCard from '../../components/user/EventCard';

const UserSchedulePage = () => {
  const { user } = useAuth();
  const { schedulesData, isLoading } = useSchedulesEvent(user?.id);

  if (!user) return null;

  return (
    <UserScheduleFragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto p-4 md:p-2">
        <EventCard.List isLoading={isLoading} data={schedulesData} />
      </div>
    </UserScheduleFragment>
  );
};

export default UserSchedulePage;
