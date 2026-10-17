import { useNavigate } from 'react-router';
import Button from './Button';
import BrickIlustration from '../../../assets/images/decorations/brick.webp';
import ConstructionIlustration from '../../../assets/images/decorations/construction.webp';
import { getHomeRoute } from '../../../utils/helpers/helpers';
import { IconBack, IconHome } from '../../../utils/helpers/decorations';
import SimakLogo from '../../../assets/images/simak-logo.webp';

export const UnderDevelopment = ({ userRole }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen p-6 overflow-hidden text-center bg-white border rounded-2xl border-slate-100 sm:p-12">
      {/* BRICK DECORATION (1 TOP RIGHT, 1 MIDDLE LEFT, 1 BOTTOM RIGHT) */}
      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute w-32 h-auto opacity-25 pointer-events-none select-none top-3 right-3 sm:top-6 sm:right-6 sm:w-40 rotate-12"
      />

      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute w-32 h-auto -translate-y-1/2 opacity-25 pointer-events-none select-none top-1/3 -left-16 sm:left-6 sm:w-50 -rotate-12"
      />

      <img
        src={BrickIlustration}
        alt=""
        aria-hidden="true"
        className="absolute w-32 h-auto -rotate-45 opacity-25 pointer-events-none select-none bottom-2 right-3 sm:bottom-6 sm:right-6 sm:w-50"
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
        {/* MAIN ILUSTRATION */}
        <div className="mb-6">
          <img
            src={ConstructionIlustration}
            alt="Fitur Dalam Pengembangan"
            className="object-contain h-auto mx-auto w-60 sm:w-70 max-h-80"
          />
        </div>

        {/* TITLE AND DESCRIPTION */}
        <h1 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-800">
          Fitur Dalam Pengembangan
        </h1>
        <p className="text-sm leading-relaxed sm:text-base text-slate-600">
          Fitur ini sedang dalam tahap pengerjaan untuk memberikan layanan
          terbaik bagi Anda. Silakan kembali lagi secara berkala!
        </p>

        {/* BUTTON NAVIGATION */}
        <div className="flex flex-col items-center justify-center w-full gap-3 mt-8 sm:flex-row">
          <Button
            to={getHomeRoute(userRole)}
            icon={<IconHome className="w-4 h-4" />}
            className="bg-amber-500! hover:bg-amber-600! text-white! sm:w-auto"
          >
            Ke Beranda
          </Button>

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

export const WatermarkOverlay = ({ watermarkText }) => (
  <div className="absolute inset-0 z-10 grid items-center grid-cols-3 grid-rows-4 gap-6 p-4 overflow-hidden pointer-events-none select-none justify-items-center">
    {Array.from({ length: 12 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-2 -rotate-24 text-slate-400/30"
      >
        {/* Logo */}
        <img
          src={SimakLogo}
          alt="Logo"
          className="object-contain w-5 h-5 sm:h-10 sm:w-10 opacity-30"
        />

        {/* Teks */}
        <div className="text-[8px] font-bold leading-tight sm:text-sm">
          <span>Dilihat oleh </span>
          <span>{watermarkText}</span>
        </div>
      </div>
    ))}
  </div>
);
