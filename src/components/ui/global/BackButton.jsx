import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { IoIosArrowRoundBack as IconArrowLeft } from 'react-icons/io';

const BackButton = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={() => navigate(-1)}
      className={`fixed top-20 left-4 md:top-24 md:left-58 z-50 flex items-center gap-2 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 shadow-md hover:shadow-lg rounded-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base font-medium border border-gray-200 cursor-pointer
        transition-all duration-300 ease-in-out
        ${
    isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 -translate-y-5 pointer-events-none'
    }
      `}
      aria-label="Kembali ke halaman sebelumnya"
    >
      <IconArrowLeft className="w-6 h-6 " />
      <span>Kembali</span>
    </button>
  );
};

export default BackButton;
