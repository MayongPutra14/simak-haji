import IdentityForm from '../../components/ui/form/IdentityForm';
import HeaderGuideline from '../../components/ui/global/HeaderGuideline';

const IdentityFormFragment = ({ userId, onSubmit, onLogout, isLoading }) => {
  return (
    <div>
      <HeaderGuideline />

      <IdentityForm
        onSubmit={onSubmit}
        isSubmitting={isLoading}
        userId={userId}
        onLogut={onLogout}
      />
    </div>
  );
};

export default IdentityFormFragment;
