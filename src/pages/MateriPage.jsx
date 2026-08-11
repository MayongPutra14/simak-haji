import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Konfigurasi worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Sub-Komponen khusus untuk merender PDF dengan aman
const PdfViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-2xl overflow-hidden shadow-inner w-full">
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <p className="text-gray-500 font-semibold py-10">
            Memuat dokumen dengan aman...
          </p>
        }
        className="flex flex-col gap-4 pointer-events-none select-none"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-md"
            width={800}
          />
        ))}
      </Document>
    </div>
  );
};

const MateriPage = () => {
  const [materi, setMateri] = useState([]);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('event_id');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || storedUser.role !== 'user') {
      navigate('/');
      return;
    }

    if (!eventId) {
      setError('ID Event tidak valid atau tidak ditemukan.');
      return;
    }

    setUserData(storedUser);

    // Mencegah klik kanan di seluruh area halaman
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    document.addEventListener('keydown', (e) => {
      // Memblokir tombol PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        alert('Tangkapan layar dinonaktifkan di halaman ini.');
      }

      // Memblokir Ctrl+U (View Source) atau Ctrl+Shift+I (DevTools)
      if (
        e.ctrlKey &&
        (e.key === 'u' || e.key === 's' || (e.shiftKey && e.key === 'I'))
      ) {
        e.preventDefault();
      }
    });

    const fetchMateri = async () => {
      const data = new FormData();
      data.append('user_id', storedUser.id);
      data.append('event_id', eventId);

      try {
        const res = await axios.post(
          'http://localhost/simak_api/get_materials.php',
          data,
        );
        if (res.data.status === 'success') {
          setMateri(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('Terjadi kesalahan saat mengambil materi.');
      }
    };

    fetchMateri();

    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [navigate, eventId]);

  const renderFile = (filePath) => {
    if (!filePath) return null;

    const fileUrl = `http://localhost/simak_api/uploads/${filePath}`;
    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(filePath);

    if (isImage) {
      return (
        <div className="mt-4 border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-100 flex justify-center">
          <img
            src={fileUrl}
            alt="Materi"
            className="max-w-full h-auto pointer-events-none select-none"
          />
        </div>
      );
    }

    return (
      <div className="mt-4 w-full">
        <PdfViewer fileUrl={fileUrl} />
      </div>
    );
  };

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="p-10 text-red-600 font-bold text-xl text-center bg-white rounded-2xl shadow-lg border border-red-100">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate('/user-dashboard')}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg text-sm"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );

  if (!userData) return null;

  const watermarkText =
    userData.nama_lengkap || userData.nomor_porsi || 'Dokumen Rahasia';

  const svgWatermark = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="red" fill-opacity="0.2" font-size="22" font-family="Arial, sans-serif" font-weight="bold" transform="rotate(-45, 150, 150)">${watermarkText}</text></svg>`;

  const watermarkBackground = `url("data:image/svg+xml,${encodeURIComponent(svgWatermark)}")`;

  return (
    <div className="materi-container relative p-4 md:p-8 select-none min-h-screen bg-gray-50 overflow-hidden">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 2147483647,
          pointerEvents: 'none',
          backgroundImage: watermarkBackground,
          backgroundRepeat: 'repeat',
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/user-dashboard')}
          className="mb-6 bg-white border border-gray-200 text-gray-800 px-6 py-2 rounded-xl font-bold shadow-sm hover:bg-gray-100 transition"
        >
          &larr; Kembali ke Dashboard
        </button>

        <h1 className="text-3xl font-extrabold mb-8 border-b-2 border-gray-200 pb-4 text-gray-800">
          Materi Kegiatan
        </h1>

        {materi.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center text-gray-500 border border-gray-100">
            Belum ada materi yang diunggah untuk event ini.
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {materi.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative"
              >
                <h2 className="text-2xl font-bold mb-3 text-sea-green-700">
                  {item.judul}
                </h2>
                {item.konten && (
                  <div
                    className="mt-2 text-gray-700 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: item.konten }}
                  />
                )}

                {renderFile(item.file_path)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MateriPage;
