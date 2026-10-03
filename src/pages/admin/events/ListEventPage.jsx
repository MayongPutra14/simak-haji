import ListEventsFragment from '../../../fragments/admin/events/ListEventsFragment';
import { useDeleteEvent } from '../../../hooks/admin/event/useDeleteEvent';
import { useGetEvents } from '../../../hooks/admin/event/useGetEvents';
import ListEvents from '../../../components/admin/events/ListEvent';
import { useAuth } from '../../../features/auth/useAuth';

export default function ListEventsPage() {
  const { user } = useAuth();
  const {
    eventData,
    isLoading: isGetLoading,
    error: getError,
    refetchData,
  } = useGetEvents({ adminId: user?.id });

  const {
    executeDeleteEvent,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteEvent();

  const handleDelete = async (eventId) => {
    const result = await executeDeleteEvent(eventId);
    if (result?.status === 'success') refetchData();
    return result;
  };
  return (
    <section>
      <ListEventsFragment>
        <ListEvents
          events={eventData}
          isLoading={isGetLoading || isDeleteLoading}
          error={getError || deleteError}
          onRefresh={refetchData}
          onDelete={handleDelete}
        />
      </ListEventsFragment>
    </section>
  );
}
