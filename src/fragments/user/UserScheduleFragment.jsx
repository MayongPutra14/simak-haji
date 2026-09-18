import NotFoundData from '../../components/ui/global/NotFoundData';
import TitlePage from '../../components/ui/global/TitlePage';
import EventCard from '../../components/user/EventCard';
import useSchedulesEvent from '../../hooks/user/useSchedules';

const UserScheduleFragment = ({ user }) => {
  const { schedulesData, isLoading } = useSchedulesEvent(user?.id);

  return (
    <>
      <TitlePage />

      <div className="flex flex-wrap justify-ceter gap-4 p-4 ">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <EventCard key={`skeleton-${index}`} isLoading={true} />
          ))
        ) : schedulesData && schedulesData.length > 0 ? (
          schedulesData.map((item) => <EventCard key={item.id} event={item} />)
        ) : (
          <NotFoundData message="Tidak ada jadwal yang tersedia" />
        )}
      </div>
    </>
  );
};

export default UserScheduleFragment;
