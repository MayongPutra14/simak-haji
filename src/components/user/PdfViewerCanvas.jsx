import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePdfProtector } from '../../hooks/global/usePdfProtector';
import { IconLoading } from '../../utils/helpers/decorations';
import { WatermarkOverlay } from '../ui/global/HelperComponents';

// CONFIGURE PDF.JS WORKER FOR REACT-PDF IN VITE ENVIRONMENT
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

/**
 * secure pdf viewer component using react-pdf with custom css watermark overlay
 * @param {object} props - component props containing pdfUrl and watermarkText
 */
export const PdfViewerCanvas = ({ pdfUrl, watermarkText = 'CONFIDENTIAL' }) => {
  const [numPages, setNumPages] = useState(null);
  const [_isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // APPLY KEYBOARD AND MOUSE PROTECTIONS
  usePdfProtector();

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Ambil lebar kontainer dikurangi padding (toleransi p-4 = 32px)
        const width = entry.contentRect.width;
        setContainerWidth(width > 0 ? width : 0);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // HANDLE SUCCESSFUL DOCUMENT LOAD
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setIsLoading(false);
  };

  // WATERMARK OVERLAY COMPONENT

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className="relative flex flex-col items-center overflow-auto select-none"
    >
      {/* REACT-PDF DOCUMENT CONTAINER */}
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center py-12">
            <IconLoading className="w-8 h-8 animate-spin text-sea-green-600 " />
          </div>
        }
        error={
          <div className="p-4 text-sm font-medium text-center text-red-600 rounded-xl bg-red-50">
            Gagal memuat dokumen PDF. Pastikan file tersedia dan CORS diizinkan.
          </div>
        }
      >
        {/* RENDER ALL PAGES WITH WATERMARK OVERLAY */}
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <div
              key={`page_${index + 1}`}
              className="relative mb-6 overflow-hidden rounded-lg shadow-md"
            >
              <WatermarkOverlay watermarkText={watermarkText} />
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={containerWidth}
                className="h-auto max-w-full "
              />
            </div>
          ))}
      </Document>
    </div>
  );
};

export default PdfViewerCanvas;
