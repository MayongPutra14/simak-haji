import IdentityForm from '../components/form/IdentityForm';
import HeaderGuideline from '../components/ui/HeaderGuideline';

const IdentityFormFragment = ({ onSubmit, isLoading }) => {
  return (
    <div>
      <HeaderGuideline />

      <IdentityForm onSubmit={onSubmit} isSubmitting={isLoading} />
    </div>
  );
};

export default IdentityFormFragment;
