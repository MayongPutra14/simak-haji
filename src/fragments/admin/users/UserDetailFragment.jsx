import ProfileDetail from '../../../components/ui/global/ProfileDetail';
import TitlePage from '../../../components/ui/global/TitlePage';
import { bgImage } from '../../../utils/bgImage';

export default function UserDetailFragment({ data, isLoading }) {
  return (
    <>
      <TitlePage
        bgImage={bgImage.bgIstiqlal}
        title="Detail Profil Jamaah"
        subtitle="Mohon periksa kembali seluruh data yang telah dimasukkan. Pastikan nama, nomor porsi, dan informasi lainnya sudah sesuai dengan paspor atau SPPH untuk menghindari kesalahan saat proses keberangkatan."
        gradientClass="from-sea-green-800 via-sea-green-800/90 to-sea-green-500/75"
      />

      <ProfileDetail data={data} isLoading={isLoading} />
    </>
  );
}
