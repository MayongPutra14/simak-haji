import { useNavigate } from 'react-router';
import { useAuth } from '../../../features/auth/useAuth';
import { MdLogout as IconLogout } from 'react-icons/md';
const DEFAULT_PROFILE = {
  nama_lengkap: 'Guest User',
  role: 'guest',
};

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profile = user || DEFAULT_PROFILE;

  const encodedName = encodeURIComponent(profile.nama_lengkap);
  const uiAvatarUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&bold=true`;
  const avatarSrc = profile.gambar || uiAvatarUrl;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 px-4 py-3 text-white border-b shadow-md bg-sea-green-900 border-sea-green-700/30 md:py-5">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE: Profil User */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={avatarSrc}
              alt={profile.nama_lengkap}
              className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-sea-green-700 md:w-12 md:h-12"
            />
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-sea-green-800 rounded-full"
              title="Online"
            />
          </div>

          <div className="flex flex-col text-xs md:text-base">
            <span className="text-white/70 font-normal leading-none mb-0.5">
              Assalamualaikum,
            </span>
            <h1 className="font-medium leading-tight tracking-tight text-white truncate max-w-45 sm:max-w-60">
              {profile.nama_lengkap}
            </h1>
          </div>
        </div>

        {/* RIGHT SIDE: BADGE ROLE & TOMBOL LOGOUT */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-0.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer md:hidden"
          >
            <IconLogout />
            Keluar
          </button>
        </div>
      </div>
    </header>
  );
}
