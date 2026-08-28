import ListUser from '../../components/admin/ListUser.jsx';
import TitlePage from '../../components/ui/global/TitlePage.jsx';
import { bgImage } from '../../utils/bgImage.js';
import useAdminUsersData from '../../hooks/admin/useGetUsers.js';

const ListUsersFragment = ({ user }) => {
  const { usersData, isLoading, error, refetch } = useAdminUsersData({
    adminId: user?.id,
  });

  return (
    <>
      <TitlePage
        title="Manajemen Pengguna"
        subtitle="Lihat dan pantau seluruh daftar pengguna yang terdaftar di dalam sistem"
        bgImage={bgImage.bgIstiqlal}
        gradientClass="from-sea-green-800 via-sea-green-800/90 to-sea-green-500/75"
      />

      <ListUser
        users={usersData}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
      />
    </>
  );
};

export default ListUsersFragment;
