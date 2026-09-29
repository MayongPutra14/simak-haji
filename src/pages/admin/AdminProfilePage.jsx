import { useAuth } from '../../features/auth/useAuth';
import AdminProfileFragment from '../../fragments/admin/AdminProfileFragment';

export default function AdminProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <AdminProfileFragment data={user.id} />
    </>
  );
}
