import useLeaderUsersData from '../../../hooks/leader/user/useGetUsers.js';
import { useAuth } from '../../../features/auth/useAuth.js';
import ListUser from '../../../components/leader/user/ListUser.jsx';

const ListUserFragment = ({ children }) => {
  return <>{children}</>;
};

export default function LeaderListUsersPage() {
  const { user } = useAuth();
  const { usersData, isLoading, error, refetch } = useLeaderUsersData({
    leaderId: user?.id,
    zone: user?.zone,
  });

  if (!user) return null;

  return (
    <ListUserFragment>
      <ListUser
        leaderId={user?.id}
        zone={user?.zone}
        users={usersData}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
      />
    </ListUserFragment>
  );
}
