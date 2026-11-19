import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../features/auth/useAuth';
import { useGetEventDetail } from '../../../hooks/leader/event/useGetEventDetail';
import DetailEvent from '../../../components/leader/event/DetailEvent';
import Button from '../../../components/ui/global/Button';
import BackButton from '../../../components/ui/global/BackButton';

function DetailEventFragment({ children }) {
  return <>{children}</>;
}

export default function LeaderDetailEventPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { eventData, isLoading, error } = useGetEventDetail(
    Number(eventId),
    user?.id,
    user?.zone,
  );

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
      <DetailEventFragment>
        <DetailEvent eventData={eventData} isLoading={isLoading} />
        <BackButton />
      </DetailEventFragment>
    </section>
  );
}
