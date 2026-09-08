import { useAuth } from '../../features/auth/useAuth';
import UserHomeFragment from '../../fragments/user/UserHomeFragment';

const UserHomePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section >
      <UserHomeFragment user={user} />
    </section>
  );
};

export default UserHomePage;
