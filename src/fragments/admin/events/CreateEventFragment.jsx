import TitlePage from '../../../components/ui/global/TitlePage';
import { bgImage } from '../../../utils/helpers/bgImage';
import CreateEvent from '../../../components/admin/events/CreateEvent';

export default function CreateEventFragment() {
  return (
    <>
      <TitlePage
        title="Buat Acara Baru"
        subtitle="Formulir pembuatan acara resmi. Pastikan seluruh informasi data, dan jadwal telah terisi dengan benar sebelum diterbitkan."
        bgImage={bgImage.bgIstiqlal}
      />

      <CreateEvent />
    </>
  );
}
