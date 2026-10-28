import { UnderDevelopment } from '../../components/ui/global/HelperComponents';
import { useAuth } from '../../features/auth/useAuth';

export function UnderDevelopmentPage() {
  const { user } = useAuth();

  return (
    <>
      <UnderDevelopment userRole={user.role} />
    </>
  );
}
