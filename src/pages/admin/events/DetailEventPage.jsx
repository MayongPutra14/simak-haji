import { useParams } from 'react-router';
import DetailEventFragment from '../../../fragments/admin/events/DetailEventFragment';

export default function DetailEventPage() {
  const { id } = useParams();

  return (
    <section>
      <DetailEventFragment />
    </section>
  );
}
