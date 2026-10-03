import { useNavigate } from 'react-router';
import EditEvent from '../../../components/admin/events/EditEvent';

export default function EditEventFragment() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/eve');
  };
  return (
    <>
      <EditEvent onCancel={handleCancel} />
    </>
  );
}
