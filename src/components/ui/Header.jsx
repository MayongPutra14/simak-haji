import { useState } from 'react';

export default function Header({
  user = { name: 'Ahmad Fauzi', role: 'Admin', avatar: null },
}) {
  // Inisial nama untuk fallback jika foto profil gagal dimuat / kosong
  const initialName = user.name
    ? user.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : 'U';

  const [imageError, setImageError] = useState(false);

  // Gambar placeholder default berkualitas dari Unsplash
  const defaultAvatarUrl =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256';

  const avatarSrc = user.avatar || defaultAvatarUrl;

  return (
    <header className="sticky top-0 z-40 bg-sea-green-800 text-white shadow-md border-b border-sea-green-700/30 px-4 py-3">
      <div className=" flex items-center justify-between">
        {/* Sisi Kiri: Profil User */}
        <div className="flex items-center gap-3">
          {/* Avatar Lingkaran Sempurna */}
          <div className="relative shrink-0">
            {!imageError ? (
              <img
                src={avatarSrc}
                alt={user.name}
                onError={() => setImageError(true)}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sea-green-700 shadow-sm"
              />
            ) : (
              // Fallback Avatar jika gambar error/tidak ada
              <div className="w-10 h-10 rounded-full bg-sea-green-700 flex items-center justify-center font-semibold text-sm text-white ring-2 ring-sea-green-700 shadow-sm">
                {initialName}
              </div>
            )}

            {/* Indikator Status Online (Opsional) */}
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-sea-green-800 rounded-full"
              title="Online"
            />
          </div>

          {/* Nama Pengguna & Status Role */}
          <div className="flex flex-col">
            <span className="text-xs text-white/70 font-normal leading-none mb-0.5">
              Selamat datang,
            </span>
            <h1 className="text-sm font-semibold text-white leading-tight tracking-tight truncate max-w-45 xs:max-w-[220px]">
              {user.name}
            </h1>
          </div>
        </div>

        {/* Sisi Kanan: Badge Role / Info Tambahan (Opsional) */}
        <div className="flex items-center">
          <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-sea-green-700/70 text-white/90 border border-sea-green-700">
            {user.role}
          </span>
        </div>
      </div>
    </header>
  );
}
