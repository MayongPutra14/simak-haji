import { useAuth } from '../../../features/auth/useAuth';
import { useLeaderCreateUserFlow } from '../../../hooks/leader/user/useCreateUserFlow';
import TitlePage from '../../../components/ui/global/TitlePage';
import CreateUser from '../../../components/leader/user/CreateUser';
import Modal from '../../../components/ui/global/Modal';
import { bgImage } from '../../../utils/helpers/decorations';
import { IconCheck, IconClose } from '../../../utils/helpers/decorations';

const CreateUserFragment = ({ children }) => {
  return <>{children}</>;
};

export default function LeaderCreateUserPage() {
  const { user } = useAuth();
  const {
    currentStep,
    createdUserId,
    isLoading,
    modal,
    closeModal,
    handleCancelProcess,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
  } = useLeaderCreateUserFlow(user?.id, user?.zone);

  return (
    <CreateUserFragment>
      {/* PAGE TITLE HEADER */}
      <TitlePage
        bgImage={bgImage.bgHaram}
        title="Pendaftaran Jamaah Baru"
        subtitle="Silakan isi data di bawah ini untuk membuat akses jamaah baru. Nomor porsi yang didaftarkan akan digunakan untuk verifikasi login."
      />

      {/* CREATE USER MULTISTEP FORM CONTAINER */}
      <CreateUser
        role={user?.role}
        zone={user?.zone}
        currentStep={currentStep}
        createdUserId={createdUserId}
        isLoading={isLoading}
        onStep1Submit={handleStep1Submit}
        onStep2Submit={handleStep2Submit}
        onStep3Submit={handleStep3Submit}
        onCancel={handleCancelProcess}
      />

      {/* NOTIFICATION MODAL */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onConfirm || closeModal}
        title={modal.title}
        description={modal.description}
        icon={
          modal.icon === 'check' ? (
            <IconCheck className="w-7 h-7" />
          ) : (
            <IconClose className="w-7 h-7" />
          )
        }
        iconBgColor={modal.iconBgColor}
        iconColor={modal.iconColor}
        buttonText="Tutup"
        buttonColor={modal.buttonColor}
      />
    </CreateUserFragment>
  );
}
