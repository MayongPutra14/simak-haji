import { useNavigate, useParams } from 'react-router';
import DetailEventFragment from '../../../fragments/admin/events/DetailEventFragment';
import { useGetEventDetail } from '../../../hooks/admin/event/useGetEventDetail';
import Button from '../../../components/ui/global/Button';

export default function DetailEventPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const { eventData, isLoading, error } = useGetEventDetail(Number(eventId));

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-4 text-center">
        <p className="text-2xl font-semibold text-rose-600">{error}</p>
        <Button onClick={() => navigate(-1)} variant="secondary">
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <section>
      <DetailEventFragment data={eventData} isLoading={isLoading} />
    </section>
  );
}
