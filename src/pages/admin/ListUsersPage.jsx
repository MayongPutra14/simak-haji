import ListUsersFragment from '../../fragments/admin/ListUsersFragment.jsx';
import { useAuth } from '../../features/auth/useAuth.js';

const ListUsersPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return <ListUsersFragment user={user} />;
};

export default ListUsersPage;
