import ListEvents from '../../../components/admin/events/ListEvent';
import TitlePage from '../../../components/ui/global/TitlePage';
import { bgImage } from '../../../utils/helpers/bgImage';
import dummyAdminEvent from '../../../utils/helpers/dummyAdminEvent.json';

export default function ListEventsFragment() {
  const dummyData = dummyAdminEvent.data;
  return (
    <>
      <TitlePage
        title="Pusat Kegiatan & Syiar Haji"
        subtitle="Daftar lengkap acara bimbingan haji. Gunakan tombol aksi untuk menambah, mengubah, atau menghapus agenda berdasarkan status waktu pelaksanaan."
        bgImage={bgImage.bgHaram}
        isMirror={true}
      />

      <ListEvents events={dummyData} />
    </>
  );
}
