import { useEffect, useRef, useState, useCallback } from 'react';
import pdfjsLib from '../../utils/helpers/pdfWorkerSetup';
import WatermarkOverlay from './WaterMarkOverlay';

export default function PdfCanvasViewer({ pdfUrl }) {
  const renderTaskRef = useRef(null);
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [scale, setScale] = useState(1.5); // Default zoom

  // Memuat Dokumen PDF
  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };
    if (pdfUrl) loadPdf();
  }, [pdfUrl]);

  // Merender Halaman ke Canvas
  const renderPage = useCallback(
    async (num, pdf) => {
      if (!pdf || !canvasRef.current) return;

      // Batalkan render sebelumnya jika masih berjalan (Mencegah blank screen di Strict Mode)
      if (renderTaskRef.current) {
        await renderTaskRef.current.cancel();
      }

      setIsRendering(true);

      try {
        const page = await pdf.getPage(num);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform =
          outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport,
        };

        // Simpan referensi task agar bisa dibatalkan jika user klik next terlalu cepat
        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
      } catch (error) {
        if (error.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', error);
        }
      } finally {
        setIsRendering(false);
        renderTaskRef.current = null;
      }
    },
    [scale],
  );

  // Memicu render ulang saat pageNum atau scale berubah
  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum, pdfDoc);
    }
  }, [pdfDoc, pageNum, scale, renderPage]);

  // Handler Navigasi & Zoom
  const goPrev = () => setPageNum((prev) => Math.max(prev - 1, 1));
  const goNext = () => setPageNum((prev) => Math.min(prev + 1, totalPages));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.8));

  return (
    <div className="flex flex-col items-center w-full">
      {/* Kontrol Navigasi PDF */}
      <div className="flex items-center gap-4 bg-gray-800 text-white px-6 py-3 border-b w-full justify-center shadow-md z-20 sticky top-0">
        <button
          onClick={goPrev}
          disabled={pageNum <= 1 || isRendering}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 transition-colors cursor-pointer"
        >
          Previous
        </button>

        <span className="font-medium min-w-25 text-center">
          {pageNum} / {totalPages || '--'}
        </span>

        <button
          onClick={goNext}
          disabled={pageNum >= totalPages || isRendering}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 transition-colors cursor-pointer"
        >
          Next
        </button>

        <div className="w-px h-6 bg-gray-600 mx-2"></div>

        <button
          onClick={zoomOut}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer"
        >
          -
        </button>
        <span className="text-sm">{(scale * 100).toFixed(0)}%</span>
        <button
          onClick={zoomIn}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Kontainer PDF & Watermark */}
      <div className="relative mt-8 mb-12 shadow-2xl border border-gray-300 bg-white">
        {/* Canvas untuk PDF */}
        <canvas ref={canvasRef} className="block mx-auto max-w-full" />

        {/* Watermark Dinamis berjalan di atas Canvas */}
        <WatermarkOverlay />
      </div>
    </div>
  );
}
