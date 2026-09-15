import { motion } from 'motion/react';
import * as motionFrames from '../../.././../utils/helpers/motion';
import { useState, useRef, useEffect } from 'react';
import LogoSimak from '../../../../assets/images/simak-logo.webp';
import {
  MdClose as IconClose,
  MdArrowDropDown as IconDropdown,
} from 'react-icons/md';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFiturExpanded, setIsMobileFiturExpanded] = useState(false);
  const desktopDropdownRef = useRef(null);

  // Close mobile menu on pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 z-40 flex justify-center w-full font-sans pointer-events-none top-4">
        <motion.nav
          variants={motionFrames.blurVariants}
          initial="hidden"
          animate="visible"
          aria-label="Main navigation"
          className="pointer-events-auto w-[95%] lg:w-[85%] bg-sea-green-800 backdrop-blur-md rounded-xl border border-sea-green-100/40 shadow-sm px-5 py-3 lg:px-8 lg:py-4 flex items-center justify-between transition-all duration-300"
        >
          {/* Left side: Brand */}
          <a
            href="/"
            className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-600"
            aria-label="SIMAK Beranda"
          >
            {/* Logo Placeholder */}
            <img
              src={LogoSimak}
              alt="Logo SIMAK"
              className="w-12 h-12 md:w-14 md:h-14"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              SIMAK
            </span>
          </a>

          {/* Center: Desktop Navigation */}
          <ul className="items-center hidden gap-10 lg:flex">
            <li>
              <a
                href="#tentang"
                className="font-medium text-white transition-colors duration-200 rounded-sm hover:text-sea-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-600"
              >
                Tentang
              </a>
            </li>

            {/* Fitur Dropdown (Hover on Desktop) */}
            <li className="relative group" ref={desktopDropdownRef}>
              <button
                aria-haspopup="true"
                aria-expanded="false"
                className="flex items-center gap-1.5 text-white group-hover:text-sea-green-600 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-600 rounded-sm py-2"
              >
                Fitur
                <IconDropdown />
              </button>

              {/* Desktop Dropdown Content */}
              <ul className="absolute invisible w-48 py-2 mt-1 transition-all duration-200 ease-out -translate-x-1/2 border rounded-lg shadow-sm opacity-0 left-1/2 top-full bg-sea-green-800 border-sea-green-100 group-hover:opacity-100 group-hover:visible">
                <li>
                  <a
                    href="#al-quran"
                    className="block px-5 py-2 text-sm text-white transition-colors duration-200 hover:bg-sea-green-600 hover:text-white-600"
                  >
                    Al-Quran
                  </a>
                </li>
                <li>
                  <a
                    href="#hadith"
                    className="block px-5 py-2 text-sm text-white transition-colors duration-200 hover:bg-sea-green-600 hover:text-white-600"
                  >
                    Hadith
                  </a>
                </li>
                <li>
                  <a
                    href="#doa"
                    className="block px-5 py-2 text-sm text-white transition-colors duration-200 hover:bg-sea-green-600 hover:text-white-600"
                  >
                    Do'a
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#testimoni"
                className="font-medium text-white transition-colors duration-200 rounded-sm hover:text-sea-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-600"
              >
                Testimoni
              </a>
            </li>
            <li>
              <a
                href="#testimoni"
                className="font-medium text-white transition-colors duration-200 rounded-sm hover:text-sea-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-600"
              >
                Dokumentasi
              </a>
            </li>
            <li>
              <a
                href="#testimoni"
                className="font-medium text-white transition-colors duration-200 rounded-sm hover:text-sea-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sea-green-600"
              >
                FAQ
              </a>
            </li>
          </ul>

          {/* Right side: Login Button (Desktop) */}
          <div className="hidden lg:block">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-galliano-500 hover:bg-galliano-700 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-galliano-600"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Toggle Button (Humberger Menu)*/}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
            }
            className="p-2 text-white transition-colors rounded-md lg:hidden hover:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <span
                className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 bottom-0 z-50 w-[85%] sm:w-[80%] max-w-sm bg-sea-green-800 border-r border-sea-green-100 shadow-xl transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-sea-green-50">
          <div className="flex items-center gap-3">
            <img src={LogoSimak} alt="Logo SIMAK" className="w-10 h-10" />
            <span className="text-lg font-semibold tracking-tight text-white">
              SIMAK
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Tutup menu"
            className="p-2 text-white transition-colors rounded-md hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <nav
          className="flex-1 px-4 py-4 overflow-y-auto"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="#tentang"
                className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tentang
              </a>
            </li>

            {/* Mobile Fitur Dropdown (Click to toggle) */}
            <li>
              <button
                onClick={() => setIsMobileFiturExpanded(!isMobileFiturExpanded)}
                aria-expanded={isMobileFiturExpanded}
                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Fitur
                <IconDropdown
                  className={`w-5 h-5 transition-transform duration-300 ease-out ${
                    isMobileFiturExpanded ? '-rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isMobileFiturExpanded
                    ? 'max-h-48 opacity-100 mt-1'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="flex flex-col gap-1 pl-8 pr-4 ml-6 border-l-2 border-sea-green-100">
                  <li>
                    <a
                      href="#al-quran"
                      className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Al-Quran
                    </a>
                  </li>
                  <li>
                    <a
                      href="#hadith"
                      className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white "
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Hadith
                    </a>
                  </li>
                  <li>
                    <a
                      href="#doa"
                      className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Do'a
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <a
                href="#testimoni"
                className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimoni
              </a>
            </li>
            <li>
              <a
                href="#testimoni"
                className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dokumentasi
              </a>
            </li>
            <li>
              <a
                href="#testimoni"
                className="block px-4 py-3 text-base font-medium text-white transition-colors rounded-lg hover:bg-white/50 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Action Section */}
        <div className="p-6 border-t border-sea-green-100">
          <a
            href="/login"
            className="flex items-center justify-center w-full py-3.5 text-base font-semibold text-white bg-galliano-500 hover:bg-galliano-700 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
