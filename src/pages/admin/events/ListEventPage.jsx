import ListEventsFragment from '../../../fragments/admin/events/ListEventsFragment';
import { useGetEvents } from '../../../hooks/admin/event/useEventManagement';
export default function ListEventsPage() {
  const { eventData } = useGetEvents();
  return (
    <section>
      <ListEventsFragment events={eventData} />
    </section>
  );
}
