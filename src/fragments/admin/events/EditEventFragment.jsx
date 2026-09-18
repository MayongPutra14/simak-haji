import { useNavigate } from 'react-router';
import EditEvent from '../../../components/admin/events/EditEvent';
import { bgImage } from '../../../utils/helpers/bgImage';
import TitlePage from '../../../components/ui/global/TitlePage';

export default function EditEventFragment() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/schedules');
  };
  return (
    <>
      <TitlePage
        title=" Perbarui Detail Acara"
        subtitle="Perbarui informasi, waktu, lokasi, atau data pada formulir di bawah ini. Perubahan akan langsung diterapkan setelah disimpan."
        bgImage={bgImage.bgHaram}
        isMirror={true}
      />

      <EditEvent onCancel={handleCancel} />
    </>
  );
}
