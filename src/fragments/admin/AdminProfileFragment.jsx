import ProfileDetail from '../../components/ui/global/ProfileDetail';
import useProfileUser from '../../hooks/user/useProfileUSer';

export default function AdminProfileFragment({ data }) {
  const { profileData, isLoading } = useProfileUser(data);

  return (
    <>
      <ProfileDetail data={profileData} isLoading={isLoading} />
    </>
  );
}
