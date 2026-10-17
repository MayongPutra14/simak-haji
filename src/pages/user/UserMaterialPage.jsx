// PAGE COMPONENT TO DISPLAY PROTECTED EVENT READING MATERIAL

import { useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/useAuth';
import { useMaterialAccess } from '../../hooks/global/useMaterialAccess';
import { PdfViewerCanvas } from '../../components/user/PdfViewerCanvas';
import Button from '../../components/ui/global/Button';
import {
  IconLocation,
  IconPerson,
  IconArrowLeft,
} from '../../utils/helpers/decorations';

/**
 * page component to display protected event reading material
 */
export const UserMaterialPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLoading, eventData, errorMessage } = useMaterialAccess(user?.id);

  // construct dynamic watermark text from user credentials
  const watermarkText = user
    ? `${user.fullName} - ${user.portionNumber}`
    : 'SIMAK-KARAWANG';

  // handle back navigation to dashboard
  const handleBackToDashboard = () => {
    navigate('/user/home');
  };

  // base url for uploads directory from backend
  const storageBaseUrl =
    import.meta.env.VITE_STORAGE_BASE_URL || 'http://localhost/simak_api';
  const pdfUrl = eventData?.file_path
    ? `${storageBaseUrl.replace(/\/$/, '')}/${eventData.file_path.replace(/^\//, '')}`
    : null;

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 rounded-full animate-spin border-sea-green-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">
            Memuat dokumen materi...
          </p>
        </div>
      </div>
    );
  }

  // ERROR OR ACCESS DENIED STATE
  if (errorMessage || !eventData) {
    return (
      <div className="max-w-lg p-6 mx-auto mt-10">
        <div className="p-6 text-center border border-red-100 rounded-2xl bg-red-50">
          <h3 className="text-lg font-bold text-red-800">
            Akses Materi Dibatasi
          </h3>
          <p className="mt-2 text-sm text-red-600">
            {errorMessage ||
              'Materi tidak tersedia atau Anda belum melakukan presensi.'}
          </p>
          <Button
            variant="primary"
            onClick={handleBackToDashboard}
            className="w-full mt-6"
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12 select-none bg-slate-900">
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-5xl p-4 mx-auto sm:px-6">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors border rounded-xl border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          >
            <IconArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Materi Live
          </span>
        </div>
      </header>

      {/* MAIN CONTENT SECTION */}
      <main className="mx-auto mt-6 w-[95%] md:max-w-4xl">
        {/* EVENT METADATA CARD */}
        <div className="p-5 mb-6 bg-white border shadow-sm rounded-2xl border-slate-200/80">
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
            {eventData.eventName}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {eventData.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 mt-4 text-xs font-medium border-t border-slate-100 text-slate-500">
            <div className="flex items-center gap-1.5">
              <IconPerson className="w-4 h-4 text-sea-green-600" />
              <span>{eventData.speaker}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconLocation className="w-4 h-4 text-sea-green-600" />
              <span>{eventData.location}</span>
            </div>
          </div>
        </div>

        {/* SECURE CANVAS VIEWER CONTAINER */}

        {pdfUrl ? (
          <PdfViewerCanvas pdfUrl={pdfUrl} watermarkText={watermarkText} />
        ) : (
          <div className="p-8 text-sm font-medium text-center text-slate-500">
            Dokumen materi belum diunggah untuk kegiatan ini.
          </div>
        )}
      </main>
    </div>
  );
};

export default UserMaterialPage;
