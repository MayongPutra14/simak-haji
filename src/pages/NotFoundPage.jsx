import NotFoundUI from '../components/ui/global/404NotFound';
import { useAuth } from '../features/auth/useAuth';

const NotFoundPage = () => {
  const { user } = useAuth();
  return (
    <>
      <NotFoundUI userRole={user.role} />
    </>
  );
};

export default NotFoundPage;
