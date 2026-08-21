import LogoSimak from '../components/ui/global/LogoSimak';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/global/Button';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <LogoSimak
        title="Selamat Datang di Website SIMAK Indonesia"
        subtitle="Jika anda memiliki pertanyaan seputar SIMAK silahkan hubungi Admin."
      />

      <div className="max-w-md mx-auto flex gap-8">
        <Button
          type="button"
          variant="primary"
          onClick={() => navigate('/login')}
        >
          Klik Untuk Login
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={() => navigate('/register')}
        >
          Klik Untuk Mendaftar
        </Button>
      </div>
    </section>
  );
};

export default LandingPage;
