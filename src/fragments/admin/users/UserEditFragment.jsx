import EditUser from '../../../components/admin/user/EditUser';
import useEditUser from '../../../hooks/admin/user/useEdiUser';
import Modal from '../../../components/ui/global/Modal';
import { IconClose } from '../../../utils/helpers/decorations';

export default function UserEditFragment() {
  const {
    initialData,
    isLoading,
    modal,
    closeModal,
    handleSave,
    handleCancel,
  } = useEditUser();

  return (
    <>
      {/* EDIT USER FORM CONTAINER */}
      <EditUser
        initialData={initialData}
        onSave={handleSave}
        onCancel={handleCancel}
        IsLoading={isLoading}
      />

      {/* NOTIFICATION MODAL */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onConfirm || closeModal}
        title={modal.title}
        description={modal.description}
        icon={modal.icon === 'close' && <IconClose className="w-7 h-7" />}
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonText="Tutup"
        buttonColor={modal.buttonColor}
      />
    </>
  );
}
