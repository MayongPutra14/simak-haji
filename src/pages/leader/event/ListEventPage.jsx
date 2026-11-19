import { useLeaderDeleteEvent } from '../../../hooks/leader/event/useDeleteEvent';
import { useLeaderGetEvents } from '../../../hooks/leader/event/useGetEvents';
import ListEvents from '../../../components/leader/event/ListEvent';
import { useAuth } from '../../../features/auth/useAuth';

function ListEventFragment({ children }) {
  return <>{children}</>;
}

export default function LeaderListEventsPage() {
  const { user } = useAuth();
  const {
    eventData,
    isLoading: isGetLoading,
    error: getError,
    refetchData,
  } = useLeaderGetEvents(user?.id, user?.zone);

  const {
    executeDeleteEvent,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useLeaderDeleteEvent();

  const handleDelete = async (eventId) => {
    const result = await executeDeleteEvent(eventId, user?.id, user?.zone);
    if (result?.status === 'success') refetchData();
    return result;
  };

  return (
    <section>
      <ListEventFragment>
        <ListEvents
          role={user?.role}
          zone={user?.zone}
          events={eventData}
          isLoading={isGetLoading || isDeleteLoading}
          error={getError || deleteError}
          onRefresh={refetchData}
          onDelete={handleDelete}
        />
      </ListEventFragment>
    </section>
  );
}
