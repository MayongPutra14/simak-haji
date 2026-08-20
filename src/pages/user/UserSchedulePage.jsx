import UserScheduleFragment from '../../fragments/user/UserScheduleFragment';
import { useAuth } from '../../features/auth/useAuth';

const UserSchedulePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section>
      <UserScheduleFragment user={user} />
    </section>
  );
};

export default UserSchedulePage;
