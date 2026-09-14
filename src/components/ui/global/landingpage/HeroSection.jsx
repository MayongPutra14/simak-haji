import BackgroundHero from '../../../../assets/images/BackgroundHero.jpg';
import Button from '../Button';
import {
  FaWhatsapp as IconWhatsapp,
  FaExternalLinkAlt as IconExternalLink,
} from 'react-icons/fa';
import {
  MdOutlineVerifiedUser as IconVerified,
  MdOutlineMenuBook as IconBook,
  MdGroups as IconGroup,
  MdOutlineVolunteerActivism as IconVolunteer,
} from 'react-icons/md';

const HeroSection = () => {
  const openWa = () => {
    const text =
      "Assalamu'alaikum, Admin SIMAK. Saya ingin berkonsultasi mengenai program SIMAK ini.";
    const message = encodeURIComponent(text);
    window.open(
      `https://wa.me/6281809847017?text=${message}`,
      '_blank',
      'noopener,noreferrer',
    );
  };
  return (
    <section className="relative w-full min-h-svh flex items-center overflow-hidden bg-[#022c22]">
      {/*
        Background Image
        Using a semantic <img> tag with proper alt text for accessibility.
        Object-cover ensures it fills the container while maintaining aspect ratio.
        Positioned to the right conceptually, but fills the background.
      */}

      <img
        src={BackgroundHero}
        alt="Pemandangan Masjidil Haram di Mekkah"
        className="absolute inset-0 object-cover object-right w-full h-full md:object-center"
        loading="eager"
        decoding="sync"
      />

      {/*
        Overlays
        1. Base dark overlay to ensure readability on mobile where the image might crop poorly.
        2. Sophisticated sea-green gradient that is solid on the left and fades to transparent on the right.
      */}

      <div
        className="absolute inset-0 bg-sea-green-950/40"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-[#022c22] via-[#064e3b]/90 to-transparent md:via-[#064e3b]/80 md:to-transparent"
        aria-hidden="true"
      ></div>

      {/*
        Content Container
        Left-aligned editorial structure.
      */}
      <div className="relative z-10 w-full px-6 mx-auto max-w-7xl sm:px-8 lg:px-12 py-28 sm:py-32 lg:py-36">
        <div className="max-w-3xl">
          {/* Badge / Eyebrow */}
          <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-sm">
            <span className="flex items-center gap-2 text-[8px] md:text-xs font-medium sm:text-sm text-white/90 letter-spacing-wider">
              <IconVolunteer className="w-4 h-4" />
              Sebuah Gerakan Sosial & Komunitas Peduli Haji
            </span>
          </div>

          {/* Primary Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
            <span className="block mb-2">Beribadah Haji</span>
            {/* Visual emphasis on "Tenang dan Nyaman" using a lighter sea-green accent for high contrast */}
            <span className="block mb-2 font-semibold text-transparent bg-linear-to-r from-galliano-600 to-galliano-400 bg-clip-text">
              Tenang dan Nyaman
            </span>
            <span className="block">Bersama SIMAK</span>
          </h1>

          {/* Supporting Description */}
          <p className="max-w-2xl mt-6 font-light leading-relaxed text-md sm:text-xl text-white/80">
            SIMAK hadir dari hati yang bergerak untuk membantu sesama. Komunitas
            nirlaba yang mendampingi jamaah melalui pelatihan ibadah haji
            mandiri yang terstruktur, jujur, dan amanah.
          </p>

          {/* Call to Action Group */}
          <div className="flex flex-col items-stretch gap-4 mt-8 sm:flex-row sm:items-center sm:gap-5">
            {/* Primary CTA */}
            <Button
              to="/register"
              className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white  hover:bg-[#047857] transition-all duration-300 ease-out rounded-sm shadow-lg shadow-[#022c22]/50 focus:outline-none focus:ring-2 focus:ring-sea-green-400 focus:ring-offset-2"
            >
              Daftar Segera
              <IconExternalLink />
            </Button>

            {/* Secondary CTA */}
            <Button
              onClick={() => openWa()}
              className="inline-flex justify-center items-center px-8 py-4 text-base font-medium text-white border border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 ease-out rounded-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#022c22]"
            >
              Konsultasi Gratis
              <IconWhatsapp className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-6 mt-6 border-t border-white/15 sm:grid-cols-3 text-white/85">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center border rounded-lg w-7 h-7 bg-sea-green-800/80 border-white/10 text-primary-fixed shrink-0">
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="verified"
                >
                  <IconVerified />
                </span>
              </div>
              <span className="leading-snug font-label-md text-label-md">
                100% Nirlaba &amp; Tanpa Biaya Tambahan
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center border rounded-lg w-7 h-7 bg-sea-green-800/80 border-white/10 text-primary-fixed shrink-0">
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="menu_book"
                >
                  <IconBook />
                </span>
              </div>
              <span className="leading-snug font-label-md text-label-md">
                Bimbingan Manasik Terstruktur
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center border rounded-lg w-7 h-7 bg-sea-green-800/80 border-white/10 text-primary-fixed shrink-0">
                <span
                  className="material-symbols-outlined text-[16px]"
                  data-icon="groups"
                >
                  <IconGroup />
                </span>
              </div>
              <span className="leading-snug font-label-md text-label-md">
                Komunitas Jamaah Mandiri
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
