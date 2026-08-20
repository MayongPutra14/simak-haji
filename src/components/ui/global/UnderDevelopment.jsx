import { useNavigate } from 'react-router';
import { Button } from './Button'; // Sesuaikan path import komponen Button Anda

// Aset Ilustrasi
import BrickIlustration from '../../../assets/images/brick.webp';
import ConstructionIlustration from '../../../assets/images/construction.webp';

// Inline Icon Components
const IconHome = ({ className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);

const IconBack = ({ className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);

const UnderDevelopment = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen w-full bg-white rounded-2xl border border-slate-100 p-6 sm:p-12 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* HIASAN BRICK (1 KANAN ATAS, 1 KIRI TENGAH, 1 KANAN BAWAH) */}
      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute top-3 right-3 sm:top-6 sm:right-6 w-32 sm:w-40 h-auto opacity-25 pointer-events-none select-none rotate-12"
      />

      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute top-1/3 -left-16 sm:left-6 -translate-y-1/2 w-32 sm:w-50 h-auto opacity-25 pointer-events-none select-none -rotate-12"
      />

      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute bottom-2 right-3 sm:bottom-6 sm:right-6 w-32 sm:w-50 h-auto opacity-25 pointer-events-none select-none -rotate-45"
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
        {/* ILUSTRASI UTAMA */}
        <div className="mb-6">
          <img
            src={ConstructionIlustration}
            alt="Fitur Dalam Pengembangan"
            className="w-60 sm:w-70 h-auto max-h-80 object-contain  mx-auto"
          />
        </div>

        {/* JUDUL DAN DESKRIPSI */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
          Fitur Dalam Pengembangan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Fitur ini sedang dalam tahap pengerjaan untuk memberikan layanan
          terbaik bagi Anda. Silakan kembali lagi secara berkala!
        </p>

        {/* BUTTON NAVIGATION MENGGUNAKAN KOMPONEN BUTTON */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {/* BUTTON KE BERANDA (KUNING SOLID) */}
          <Button
            onClick={handleGoHome}
            icon={<IconHome className="w-4 h-4" />}
            className="bg-amber-500! hover:bg-amber-600! text-white! sm:w-auto"
          >
            Ke Beranda
          </Button>

          {/* BUTTON KEMBALI (KUNING OUTLINE/GHOST) */}
          <Button
            variant="outline"
            onClick={handleGoBack}
            icon={<IconBack className="w-4 h-4" />}
            className="border-amber-500! text-amber-600! hover:bg-amber-50! sm:w-auto"
          >
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
