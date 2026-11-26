import { useEffect, useState } from 'react';
import { IconArrowLeft } from '../../../utils/helpers/decorations';
import { useNavigate } from 'react-router';
import { getHomeRoute } from '../../../utils/helpers/helpers';

// BACK BUTTON COMPONENT
const BackButton = ({ userRole, redirectToHome = false }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // show button after scrolling down 100px
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // HANDLE NAVIGATION ACTION
  const handleBack = () => {
    if (redirectToHome && userRole) {
      navigate(getHomeRoute(userRole));
      return;
    }

    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className={`fixed top-20 left-4 md:top-24 md:left-58 z-50 flex items-center gap-2 bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 shadow-md hover:shadow-lg rounded-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base font-medium border border-gray-200 cursor-pointer
        transition-all duration-300 ease-in-out
        ${
    isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 -translate-y-5 pointer-events-none'
    }
      `}
      aria-label={
        redirectToHome
          ? 'Kembali ke halaman utama'
          : 'Kembali ke halaman sebelumnya'
      }
    >
      <IconArrowLeft className="w-6 h-6" />
      <span>Kembali</span>
    </button>
  );
};

export default BackButton;
