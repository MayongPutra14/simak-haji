import { bgImage } from '../../../utils/helpers/bgImage';
import TitlePage from '../../../components/ui/global/TitlePage';
import DetailEvent from '../../../components/admin/events/DetailEvent';

export default function DetailEventFragment() {
  return (
    <>
      <TitlePage
        bgImage={bgImage.bgNabawi}
        title="Detail Informasi Acara"
        subtitle="Menampilkan nama program, jadwal pelaksanaan, serta titik pemetaan lokasi kegiatan seminar atau pelatihan Haji untuk kebutuhan monitoring admin."
      />

      <DetailEvent />
    </>
  );
}
