import { useQRScanner } from '../../hooks/user/useQRScanner';

const FullScreenScanner = ({ isOpen, onClose, onScanSuccess }) => {
  // Panggil hook di level teratas, lalu teruskan status 'isOpen' ke dalamnya
  useQRScanner(onScanSuccess, null, isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-black">
      {/* SCANNER HEADER */}
      <div className="flex items-center justify-between p-4 bg-black/80">
        <h2 className="text-lg font-semibold text-white">Scan Event QR</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>

      {/* SCANNER CAMERA AREA */}
      <div className="flex-1 w-full h-full relative flex items-center justify-center">
        {/* This div ID is required and read by html5-qrcode */}
        <div
          id="qr-reader"
          className="w-full max-w-md overflow-hidden rounded-2xl"
        ></div>

        {/* Guide text overlay */}
        <p className="absolute bottom-10 w-full text-center text-white bg-black/50 py-2">
          Point the camera at the QR Code
        </p>
      </div>
    </div>
  );
};

export default FullScreenScanner;
