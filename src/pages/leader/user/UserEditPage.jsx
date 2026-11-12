import EditUser from '../../../components/leader/user/EditUser';
import Modal from '../../../components/ui/global/Modal';
import { useAuth } from '../../../features/auth/useAuth';
import useLeaderEditUser from '../../../hooks/leader/user/useEdiUser';
import { IconClose } from '../../../utils/helpers/decorations';

const UserEditFragment = ({ children }) => {
  return <>{children}</>;
};

export default function LeaderUserEditPage() {
  const { user } = useAuth();
  const {
    initialData,
    isLoading,
    modal,
    closeModal,
    handleSave,
    handleCancel,
  } = useLeaderEditUser(user?.id, user?.zone);

  return (
    <UserEditFragment>
      {/* EDIT USER FORM CONTAINER */}
      <EditUser
        zone={user?.zone}
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
        icon={modal.iconType === 'close' && <IconClose className="w-7 h-7" />}
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonText="Tutup"
        buttonColor={modal.buttonColor}
      />
    </UserEditFragment>
  );
}
