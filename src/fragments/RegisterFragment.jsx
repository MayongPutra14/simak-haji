import { LogoSimak } from '../components/ui/LogoSimak';
import { RegisterForm } from '../components/form/RegisterForm';

export const RegisterFormFragment = ({ onSubmit }) => {
  return (
    <>
      <LogoSimak
        title="Registrasi Jemaah Baru SIMAK"
        subtitle="Siapkan dokumen Anda dan isi data diri dengan lengkap"
      />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};
