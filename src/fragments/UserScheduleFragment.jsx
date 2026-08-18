import TitlePage from '../components/ui/TitlePage';
import EventCard from '../components/ui/EventCard';
import useSchedulesEvent from '../hooks/useSchedules';

const UserScheduleFragment = ({ user }) => {
  const { schedulesData, isLoading } = useSchedulesEvent(user?.id);

  return (
    <>
      <TitlePage />

      <div className="flex flex-col w-full max-w-2xl gap-4 p-4 mx-auto">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <EventCard key={`skeleton-${index}`} isLoading={true} />
          ))
        ) : schedulesData && schedulesData.length > 0 ? (
          schedulesData.map((item) => <EventCard key={item.id} event={item} />)
        ) : (
          <p className="text-center text-slate-500">
            Tidak ada jadwal tersedia.
          </p>
        )}
      </div>
    </>
  );
};

export default UserScheduleFragment;
