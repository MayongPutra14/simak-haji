import { useNavigate } from 'react-router';
import { RegisterFormFragment } from '../fragments/RegisterFragment';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    try {
      console.log('1. Mengirim data berikut ke ReqRes API:', data);

      // Menggunakan endpoint dummy ReqRes
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          porsiNumber: data.porsiNumber,
          whatsappNumber: data.whatsappNumber,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Gagal mengirim data ke server');
      }

      // 2. Tampilkan respon dari ReqRes di Console
      console.log('2. Respon Sukses dari ReqRes API:', result);

      alert(`Registrasi Berhasil! (ID User Baru dari Server: ${result.id})`);

      // 3. Pindah ke halaman login (atau halaman utama)
      navigate('/login');
    } catch (error) {
      console.error('Error saat tes API:', error);
      alert(`Terjadi kesalahan: ${error.message}`);
    }
  };
  return (
    <section className="bg-sea-green-800 min-h-screen flex flex-col justify-center pb-12 pt-4">
      <RegisterFormFragment onSubmit={handleRegister} />
    </section>
  );
};
