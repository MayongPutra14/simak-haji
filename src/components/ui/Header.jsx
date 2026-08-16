import { useState } from 'react';

export default function Header({
  user = { name: 'Ahmad Fauzi', role: 'Admin', avatar: null },
}) {
  // FALLBACK IF DATA NOT FOUND
  const initialName = user.name
    ? user.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : 'U';

  const [imageError, setImageError] = useState(false);

  // PLACE HOLDER PICTURE
  const defaultAvatarUrl =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256';

  const avatarSrc = user.avatar || defaultAvatarUrl;

  return (
    <header className="sticky top-0 z-40 px-4 py-3 text-white border-b shadow-md bg-sea-green-800 border-sea-green-700/30 md:py-5">
      <div className="flex items-center justify-between ">
        {/* LEFT SIDE: Profil User */}
        <div className="flex items-center gap-3">
          {/* CIRCLE AVATAR */}
          <div className="relative shrink-0">
            {!imageError ? (
              <img
                src={avatarSrc}
                alt={user.name}
                onError={() => setImageError(true)}
                className="object-cover w-10 h-10 rounded-full shadow-sm ring-2 ring-sea-green-700 md:w-15 md:h-15"
              />
            ) : (
              // FALLBACK AVATAR
              <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white rounded-full shadow-sm bg-sea-green-700 ring-2 ring-sea-green-700">
                {initialName}
              </div>
            )}

            {/* INDICATOR STATUS ONLINE */}
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-sea-green-800 rounded-full"
              title="Online"
            />
          </div>

          {/* USERNAME & ROLE */}
          <div className="flex flex-col text-xs md:text-xl">
            <span className=" text-white/70 font-normal leading-none mb-0.5">
              Selamat datang,
            </span>
            <h1 className="font-semibold text-white leading-tight tracking-tight truncate max-w-45 xs:max-w-[220px]">
              {user.name}
            </h1>
          </div>
        </div>

        {/* LEFT SIDE: BADGE ROLE */}
        <div className="flex items-center">
          <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-sea-green-700/70 text-white/90 border border-sea-green-700">
            {user.role}
          </span>
        </div>
      </div>
    </header>
  );
}
