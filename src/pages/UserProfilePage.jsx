import UserProfileFragment from '../fragments/UserProfileFragment';
import { useAuth } from '../features/auth/useAuth';

export default function UserProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="pb-6 space-y-4 bg-white">
      <UserProfileFragment user={user} />
    </section>
  );
}
