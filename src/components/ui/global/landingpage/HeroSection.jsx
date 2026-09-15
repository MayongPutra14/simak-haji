import BackgroundHero from '../../../../assets/images/decorations/BackgroundHero.webp';
import Button from '../Button';
import { motion } from 'motion/react';
import * as motionFrame from '../../../../utils/helpers/motion';
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
    <motion.section
      variants={motionFrame.outerContainerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full min-h-svh flex items-center overflow-hidden bg-[#022c22]"
    >
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
          <motion.div
            variants={motionFrame.fadeInvariants}
            className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-sm"
          >
            <span className="flex items-center gap-2 text-[8px] md:text-xs font-medium sm:text-sm text-white/90 letter-spacing-wider">
              <IconVolunteer className="w-4 h-4" />
              Sebuah Gerakan Sosial & Komunitas Peduli Haji
            </span>
          </motion.div>

          {/* Primary Heading */}
          <motion.h1
            variants={motionFrame.outerContainerVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
          >
            <motion.span
              variants={motionFrame.innerItemVariants}
              className="block mb-2"
            >
              Beribadah Haji
            </motion.span>
            {/* Visual emphasis on "Tenang dan Nyaman" using a lighter sea-green accent for high contrast */}
            <motion.span
              variants={motionFrame.innerItemVariants}
              className="block pb-1 mb-2 font-semibold text-transparent bg-linear-to-r from-galliano-600 to-galliano-400 bg-clip-text"
            >
              Tenang dan Nyaman
            </motion.span>
            <motion.span
              variants={motionFrame.innerItemVariants}
              className="block"
            >
              Bersama SIMAK
            </motion.span>
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            variants={motionFrame.innerItemVariants}
            className="max-w-2xl mt-6 font-light leading-relaxed text-md sm:text-xl text-white/80"
          >
            SIMAK hadir dari hati yang bergerak untuk membantu sesama. Komunitas
            nirlaba yang mendampingi jamaah melalui pelatihan ibadah haji
            mandiri yang terstruktur, jujur, dan amanah.
          </motion.p>

          {/* Call to Action Group */}
          <motion.div
            variants={motionFrame.innerItemVariants}
            className="flex flex-col items-stretch gap-4 mt-8 sm:flex-row sm:items-center sm:gap-5"
          >
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
          </motion.div>

          {/* BEDGE */}
          <motion.div
            variants={motionFrame.outerItemVariants}
            className="grid grid-cols-1 gap-4 pt-6 mt-6 border-t border-white/15 sm:grid-cols-3 text-white/85"
          >
            <motion.div
              variants={motionFrame.bedgeVariants}
              className="flex items-center gap-2.5"
            >
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
            </motion.div>

            <motion.div
              variants={motionFrame.bedgeVariants}
              className="flex items-center gap-2.5"
            >
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
            </motion.div>

            <motion.div
              variants={motionFrame.bedgeVariants}
              className="flex items-center gap-2.5"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* DEVIDER */}
      <div className="custom-shape-divider-bottom-1789437268">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </motion.section>
  );
};

export default HeroSection;
