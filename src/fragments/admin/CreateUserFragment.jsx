import TitlePage from '../../components/ui/global/TitlePage';
import CreateUser from '../../components/admin/CreateUser';
import { bgImage } from '../../utils/bgImage';

const CreateUserFragment = () => {
  return (
    <>
      <TitlePage
        bgImage={bgImage.bgAqsa}
        title="Pendaftaran Jamaah Baru"
        subtitle="Silakan isi data di bawah ini untuk membuat akses jamaah baru. Nomor porsi yang didaftarkan akan digunakan untuk verifikasi login."
      />

      <CreateUser />
    </>
  );
};

export default CreateUserFragment;
