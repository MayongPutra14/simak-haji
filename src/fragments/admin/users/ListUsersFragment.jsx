import ListUser from '../../../components/admin/ListUser.jsx';
import useAdminUsersData from '../../../hooks/admin/user/useGetUsers';

const ListUsersFragment = ({ user }) => {
  const { usersData, isLoading, error, refetch } = useAdminUsersData({
    adminId: user?.id,
  });

  return (
    <>
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
