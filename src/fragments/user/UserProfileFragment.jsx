import ProfileDetail from '../../components/ui/global/ProfileDetail';
import useProfileUser from '../../hooks/user/useProfileUSer';

const UserProfileFragment = ({ user }) => {
  const { profileData, isLoading } = useProfileUser(user?.id);
  return (
    <>
      <ProfileDetail data={profileData} isLoading={isLoading} />
    </>
  );
};

export default UserProfileFragment;
