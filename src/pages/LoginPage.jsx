import { useNavigate } from 'react-router';
import { LoginFormFragment } from '../fragments/LoginFormFragment';

export const LoginPage = ({ setIsAuthenticated }) => {
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

      if (response.ok) {
        const result = await response.json();
        const token = result.id || 'user-atuthentication-token';
        localStorage.setItem('token', token);

        setIsAuthenticated(true);

        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saat login:', error);
    }
  };
  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <LoginFormFragment onSubmit={handleLogin} />
    </section>
  );
};
