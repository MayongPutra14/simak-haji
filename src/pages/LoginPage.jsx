import { useNavigate } from 'react-router';
import { LoginFormFragment } from '../fragments/LoginFormFragment';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomor_porsi: data.porsiNumber,
          password: data.password,
        }),
      });
    } catch (error) {}
  };
  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <LoginFormFragment />
    </section>
  );
};
