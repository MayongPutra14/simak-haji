import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useMateriData } from '../../hooks/user/useMateriData';
import { useEventTimer } from '../../hooks/user/useEventTimer';
import PdfCanvasViewer from '../../components/user/PdfCanvasViewer';
import { useSecurityProtection } from '../../utils/user/userSecurityProtection';

export default function MateriReaderPage() {
  const { materiId } = useParams();
  const navigate = useNavigate();

  // Mengambil data simulasi dari service
  const { data: materi, loading, error } = useMateriData(materiId);

  // Mengirimkan endTime ke hook timer (jika data sudah ada)
  const { timeLeft, isExpired } = useEventTimer(materi?.endTime);

  const { isBlackout } = useSecurityProtection();

  // Trigger Auto-Redirect jika waktu habis
  useEffect(() => {
    if (isExpired) {
      alert(
        'Waktu akses materi telah habis. Anda akan dialihkan ke Dashboard.',
      );
      navigate('/dashboard', { replace: true });
    }
  }, [isExpired, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse font-medium">
          Memuat materi PDF...
        </p>
      </div>
    );
  }

  if (error || !materi) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-red-500 font-semibold">
          {error || 'Materi tidak ditemukan'}
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* OVERLAY BLACKOUT (Aktif saat indikasi screenshot/blur terdeteksi) */}
      {isBlackout && (
        <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center">
          <div className="text-center p-6 bg-gray-900 rounded-lg max-w-md border border-gray-700">
            <h2 className="text-xl font-bold text-red-500 mb-2">
              Akses Dijeda
            </h2>
            <p className="text-gray-300 text-sm">
              Sistem mendeteksi perpindahan fokus layar, penggunaan DevTools,
              atau indikasi tangkapan layar. Kembalikan fokus ke jendela ini
              untuk melanjutkan membaca materi.
            </p>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className="flex-none bg-white border-b border-gray-200 px-6 py-4 shadow-sm z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
          >
            &larr; Kembali
          </button>
          <h1 className="text-lg font-bold text-gray-800 line-clamp-1">
            {materi.title}
          </h1>
        </div>

        {/* Timer Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Sisa Waktu:</span>
          <span className="font-mono text-base font-bold text-red-600 bg-red-50 px-3 py-1 rounded-md border border-red-100">
            {timeLeft}
          </span>
        </div>
      </header>

      {/* Area Canvas PDF (Placeholder untuk Fase 3) */}
      <main className="flex-1 relative overflow-auto bg-gray-50/50 p-6 flex justify-center items-start">
        <div className="w-full max-w-4xl min-h-200 bg-white shadow-xl border border-gray-200 rounded-sm flex items-center justify-center">
          {materi?.pdfUrl ? (
            <PdfCanvasViewer pdfUrl={materi.pdfUrl} />
          ) : (
            <p className="mt-20 text-gray-500">URL PDF tidak tersedia.</p>
          )}
        </div>
      </main>
    </div>
  );
}
