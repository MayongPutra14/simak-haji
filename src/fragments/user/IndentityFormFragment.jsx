import IdentityForm from '../../components/ui/form/IdentityForm';
import HeaderGuideline from '../../components/ui/global/HeaderGuideline';

const IdentityFormFragment = ({ userId, onSubmit, isLoading }) => {
  return (
    <div>
      <HeaderGuideline />

      <IdentityForm
        onSubmit={onSubmit}
        isSubmitting={isLoading}
        userId={userId}
      />
    </div>
  );
};

export default IdentityFormFragment;
