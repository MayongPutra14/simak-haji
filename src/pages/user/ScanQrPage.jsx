import { useState } from 'react';
import useGeolocation from '../../hooks/global/useGeoLocation';
import { useAuth } from '../../features/auth/useAuth';
import { useSubmitAttendance } from '../../hooks/user/useSubmitAttendance';
import QrScannerView from '../../components/ui/global/QrScannerView';
import {
  IconCheck,
  IconLoading,
  IconClose,
} from '../../utils/helpers/decorations';

// SCAN QR PAGE COMPONENT
export default function ScanQrPage() {
  const { user } = useAuth();
  const locationData = useGeolocation();
  const { submitAttendance, isSubmitting } = useSubmitAttendance();

  const [scannedData, setScannedData] = useState(null);
  const [attendanceResult, setAttendanceResult] = useState(null);

  // HANDLE COMPLETED SCAN EVENT
  const handleQrScanned = async (qrHash, currentLoc) => {
    const payload = {
      userId: user.id,
      qrHash: qrHash,
      latitude: currentLoc?.latitude || locationData.location.latitude,
      longitude: currentLoc?.longitude || locationData.location.longitude,
    };

    setScannedData(payload);
    setAttendanceResult(null);

    const response = await submitAttendance(payload);
    setAttendanceResult(response);
  };

  // RESET SCANNER STATE
  const handleReset = () => {
    setScannedData(null);
    setAttendanceResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-4 py-8 -mb-20">
      {/* Pembungkus konten agar lebar header dan card tetap sinkron dan rapi di tengah */}
      <div className="w-full max-w-md">
        {/* PAGE HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-sea-green-300">
            Scan QR Event
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Arahkan kamera ke QR Code event untuk melakukan presensi kehadiran.
          </p>
        </div>

        {/* SCANNER VIEW OR RESULT DISPLAY */}
        {!scannedData ? (
          <QrScannerView
            locationData={locationData}
            onQrScanned={handleQrScanned}
          />
        ) : (
          <div className="p-6 bg-slate-800 rounded-2xl border border-sea-green-700 text-center space-y-4">
            {isSubmitting ? (
              <div className="w-14 h-14 mx-auto bg-sea-green-500/20 text-sea-green-400 rounded-full flex items-center justify-center">
                <div className="animate-spin">
                  <IconLoading className="w-7 h-7" />
                </div>
              </div>
            ) : attendanceResult?.success === 'success' ? (
              <div className="w-14 h-14 mx-auto bg-sea-green-500/20 text-sea-green-400 rounded-full flex items-center justify-center">
                <IconCheck className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-14 h-14 mx-auto bg-red-500/20 text-red-400 rounded-full flex items-center justify-center">
                <IconClose className="w-12 h-12 text-rose-500 font-bold text-2xl" />
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-white">
                {isSubmitting
                  ? 'Menyimpan Presensi...'
                  : attendanceResult?.success === 'success'
                    ? 'Kehadiran Berhasil Dicatat!'
                    : 'Presensi Gagal'}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {isSubmitting
                  ? 'Mohon tunggu sebentar, data Anda sedang dikirim ke server.'
                  : attendanceResult?.message}
              </p>
            </div>

            {/* SUMMARY OF PRESENTION */}
            {!isSubmitting && attendanceResult?.success === 'success' && (
              <div className="p-4 bg-slate-900/80 rounded-xl text-left space-y-2 border border-slate-700/50 text-xs text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Nama Acara</span>
                  <span className="font-semibold text-slate-200">
                    {attendanceResult.data?.event_name}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Status Kehadiran</span>
                  <span className="font-semibold text-sea-green-400 bg-sea-green-500/10 px-2 py-0.5 rounded-full">
                    Berhasil Hadir
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Waktu Presensi</span>
                  <span className="font-mono text-slate-200">
                    {attendanceResult.data?.waktu_absen}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleReset}
              disabled={isSubmitting}
              className="w-full py-3 text-xs font-semibold text-sea-green-950 bg-sea-green-400 rounded-xl hover:bg-sea-green-300 transition-colors disabled:opacity-50 shadow-lg shadow-sea-green-500/10"
            >
              {isSubmitting ? 'Memproses...' : 'Coba Lagi'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
