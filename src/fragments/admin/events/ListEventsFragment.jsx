import ListEvents from '../../../components/admin/events/ListEvent';
import TitlePage from '../../../components/ui/global/TitlePage';
import { bgImage } from '../../../utils/helpers/bgImage';

export default function ListEventsFragment({ events }) {
  return (
    <>
      <TitlePage
        title="Pusat Kegiatan & Syiar Haji"
        subtitle="Daftar lengkap acara bimbingan haji. Gunakan tombol aksi untuk menambah, mengubah, atau menghapus agenda berdasarkan status waktu pelaksanaan."
        bgImage={bgImage.bgHaram}
        isMirror={true}
      />

      <ListEvents events={events} />
    </>
  );
}
