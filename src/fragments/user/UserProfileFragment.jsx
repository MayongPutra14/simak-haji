import TitlePage from '../../components/ui/global/TitlePage';
import UserProfile from '../../components/user/UserProfile';
import useProfileUser from '../../hooks/useProfileUSer';

const UserProfileFragment = ({ user }) => {
  const { profileData, isLoading } = useProfileUser(user?.id);
  return (
    <>
      <TitlePage
        title="Profile Jamaah"
        subtitle="Lihat detail identitasmu dan pastikan semua data yang telah dikirim serta kontak sudah sesuai."
        bgImage="https://i.pinimg.com/736x/16/ed/47/16ed476ff53c6b0d07f84e7c3e68407e.jpg"
        isMirror
      />

      <UserProfile profileData={profileData} isLoading={isLoading} />
    </>
  );
};

export default UserProfileFragment;
