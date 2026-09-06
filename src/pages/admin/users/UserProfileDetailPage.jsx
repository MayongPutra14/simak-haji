import { useParams, useNavigate } from 'react-router';
import UserDetailFragment from '../../../fragments/admin/users/UserDetailFragment';
import useGetUserDetail from '../../../hooks/admin/user/useGetUserDetail';
import Button from '../../../components/ui/global/Button';
// import Modal from '../../../components/ui/global/Modal';

export default function UserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userData, isLoading, error } = useGetUserDetail(userId);

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
    <>
      <UserDetailFragment data={userData} isLoading={isLoading} />
    </>
  );
}
