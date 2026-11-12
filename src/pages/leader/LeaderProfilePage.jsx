import { useAuth } from '../../features/auth/useAuth';
import useProfileUser from '../../hooks/user/useProfileUSer';
import ProfileDetail from '../../components/ui/global/ProfileDetail';

const LeaderProfileFragment = ({ children }) => {
  return <> {children} </>;
};

export default function LeaderProfilePage() {
  const { user } = useAuth();
  const { profileData, isLoading } = useProfileUser(user.id);

  if (!user) return null;

  return (
    <LeaderProfileFragment>
      <ProfileDetail data={profileData} isLoading={isLoading} />
    </LeaderProfileFragment>
  );
}
