import { LoginForm } from '../components/form/LoginForm';
import { LogoSimak } from '../components/ui/LogoSimak';

export const LoginFormFragment = ({ onSubmit }) => {
  return (
    <div>
      <LogoSimak
        title="Dashboard Layanan SIMAK"
        subtitle="Silahkan masuk untuk mengakses akun Anda"
      />
      <div>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
