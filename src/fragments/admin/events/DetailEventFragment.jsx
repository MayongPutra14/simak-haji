import DetailEvent from '../../../components/admin/events/DetailEvent';
import BackButton from '../../../components/ui/global/BackButton';

export default function DetailEventFragment({ data, isLoading }) {
  return (
    <>
      <DetailEvent eventData={data} isLoading={isLoading} />
      <BackButton />
    </>
  );
}
