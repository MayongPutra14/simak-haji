import { Link } from 'react-router';
import { LoginContainer } from '../components/form/LoginForm';
import { LogoSimak } from '../components/ui/LogoSimak';

export const LoginFragment = () => {
  return (
    <div className="">
      <LogoSimak />
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <LoginContainer />
        <div className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <Link
            to="/register"
            className="text-sea-green-600 font-semibold underline"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
