import { useNavigate, Link } from 'react-router';
import {
  IoArrowBack as IconBack,
  IoHomeOutline as IconHome,
} from 'react-icons/io5';
import SimakLogo from '../../assets/images/simak-logo.webp';

export const NotFoundUI = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Kembali ke halaman/link sebelumnya di riwayat browser
    navigate(-1);
  };

  return (
    <section className="min-h-screen bg-sea-green-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-xl shadow-sea-green-950/20 transition-all">
        {/* SIMAK LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src={SimakLogo}
            alt="Logo SIMAK Instansi"
            className="h-32 w-auto object-contain"
          />
        </div>

        {/* STATUS CODE 404 */}
        <h1 className="text-7xl font-extrabold text-sea-green-800 tracking-tight">
          404
        </h1>

        {/* TITLE*/}
        <h2 className="mt-3 text-xl font-bold text-slate-800">
          Halaman Tidak Ditemukan
        </h2>

        {/* SHORT DESCRIPTION */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat ditemukan, telah dipindahkan,
          atau alamat URL yang dimasukkan salah.
        </p>

        {/* BUTTON NAVIGATIO */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* BACK TO HOME */}
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sea-green-600 hover:bg-sea-green-700 text-white font-semibold text-sm transition-colors cursor-pointer shadow-xs"
          >
            <IconHome className="w-4 h-4" />
            <span>Ke Beranda</span>
          </Link>

          {/* BACK TO PREVIOUS PAGE */}
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-sea-green-600 text-sea-green-700 hover:bg-sea-green-100 font-semibold text-sm transition-colors cursor-pointer"
          >
            <IconBack className="w-4 h-4" />
            <span>Kembali</span>
          </button>
        </div>
      </div>
    </section>
  );
};
