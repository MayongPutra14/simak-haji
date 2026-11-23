import { useNavigate } from 'react-router';
import { MdArrowBack, MdPerson } from 'react-icons/md';

/**
 * Sticky page header for the standalone `/absensi-saya` page.
 * The back button always returns to the jamaah home, never `history.back()`,
 * so the destination stays predictable (PRD 3.3).
 */
export default function AttendancePageHeader({ user }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-sea-green-100/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => navigate('/user/home')}
            aria-label="Kembali ke beranda"
            className="-ml-2 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-sea-green-800 transition-colors hover:bg-sea-green-50 active:bg-sea-green-100"
          >
            <MdArrowBack className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <span className="block truncate text-[10px] font-semibold uppercase tracking-wider text-sea-green-700">
              SIMAK Karawang
            </span>
            <h1 className="truncate text-base font-bold text-slate-800 md:text-lg">
              Absensi Saya
            </h1>
          </div>
        </div>

        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={user.fullName || 'Foto jamaah'}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-sea-green-100"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sea-green-600 shadow-sm">
            <MdPerson className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
        )}
      </div>
    </header>
  );
}
