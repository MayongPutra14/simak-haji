import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../../../features/auth/useAuth';
import useGetUserDetail from '../../../hooks/leader/user/useGetUserDetail';
import ProfileDetail from '../../../components/ui/global/ProfileDetail';
import Button from '../../../components/ui/global/Button';
import BackButton from '../../../components/ui/global/BackButton';

const UserDetailFragment = ({ children }) => {
  return <>{children}</>;
};

export default function LeaderUserDetailPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userId } = useParams();
  const { userData, isLoading, error } = useGetUserDetail(
    userId,
    user?.id,
    user?.zone,
  );

  if (!user) return null;

  if (error) {
    return (
      <div className="p-8 space-y-4 text-center">
        <p className="font-semibold text-rose-600">{error}</p>
        <Button onClick={() => navigate(-1)} variant="secondary">
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <UserDetailFragment>
      <ProfileDetail data={userData} isLoading={isLoading} />
      <BackButton />
    </UserDetailFragment>
  );
}
