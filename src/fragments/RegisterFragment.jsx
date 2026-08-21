import LogoSimak from '../components/ui/global/LogoSimak';
import RegisterForm from '../components/ui/form/RegisterForm';

const RegisterFormFragment = ({ onSubmit }) => {
  return (
    <div>
      <LogoSimak
        title="Registrasi Jemaah Baru SIMAK"
        subtitle="Siapkan dokumen Anda dan isi data diri dengan lengkap"
      />
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterFormFragment;
