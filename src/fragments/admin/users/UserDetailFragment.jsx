import BackButton from '../../../components/ui/global/BackButton';
import ProfileDetail from '../../../components/ui/global/ProfileDetail';

export default function UserDetailFragment({ data, isLoading }) {
  return (
    <>
      <ProfileDetail data={data} isLoading={isLoading} />
      <BackButton />
    </>
  );
}
