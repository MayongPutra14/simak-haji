import { useAuth } from '../../features/auth/useAuth';
import UserHomeFragment from '../../fragments/user/UserHomeFragment';

const UserHomePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="w-full bg-sea-green-50">
      <UserHomeFragment user={user} />
    </section>
  );
};

export default UserHomePage;
