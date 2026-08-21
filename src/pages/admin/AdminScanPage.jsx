import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router'; // Tambahkan useLocation

const AdminScanPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil event_id dari URL (contoh: /admin-scan?event_id=2)
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('event_id');

  const isProcessing = useRef(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Pastikan event_id ada di URL, jika tidak kembalikan ke dashboard
    if (!eventId) {
      alert('ID Event tidak ditemukan! Silakan buka scanner melalui Dashboard Admin.');
      navigate('/admin-dashboard');
      return;
    }

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 5
    });

    scanner.render(async (decodedText) => {
      if (isProcessing.current) return;

      isProcessing.current = true;
      setScanResult(decodedText);
      scanner.pause(true);

      // Kirim eventId yang dinamis dari URL ke backend
      const data = new FormData();
      data.append('qr_code', decodedText);
      data.append('event_id', eventId);

      try {
        const response = await axios.post('http://localhost/simak_api/scan_absen.php', data);
        alert(response.data.message);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Gagal mengirim data absen:', errorMessage);
        alert(`Kesalahan Server: ${  errorMessage}`);
      } finally {
        setTimeout(() => {
          isProcessing.current = false;
          scanner.resume();
        }, 2000);
      }

    }, (err) => {
      // Abaikan error pembacaan frame
    });

    return () => {
      scanner.clear().catch((e) => console.error('Gagal mematikan scanner', e));
    };
  }, [navigate, eventId]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Scan QR Absensi</h2>
      <div id="reader" className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg border-2 border-sea-green-600"></div>
      {scanResult && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-600 text-sm">Terakhir discan:</p>
          <p className="font-mono font-bold text-sea-green-700">{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default AdminScanPage;