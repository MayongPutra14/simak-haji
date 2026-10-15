import { useEffect, useRef } from 'react';
import useQrScanner from '../../../hooks/global/useQrScanner';

const SCANNER_ELEMENT_ID = 'qr-reader-viewport';

// QR SCANNER VIEW COMPONENT
export default function QrScannerView({ locationData, onQrScanned }) {
  const {
    location,
    error: locationError,
    isLoading: isLocLoading,
  } = locationData;

  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  const { isCameraActive, cameraError, startScanner, stopScanner } =
    useQrScanner({
      elementId: SCANNER_ELEMENT_ID,
      onScanSuccess: (decodedText) => {
        // stop camera immediately after valid scan to release hardware resources
        stopScanner();

        onQrScanned(decodedText, locationRef.current);
      },
    });

  // START CAMERA ONLY ON INITIAL MOUNT
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      startScanner();
    }

    // cleanup scanner session when leaving route or unmounting
    return () => {
      isMounted = false;
      stopScanner();
    };
  }, []); // empty dependency array prevents re-render looping on location state updates

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 space-y-4">
      {/* INJECT CSS TO DISABLE VIDEO MIRROR EFFECT */}
      <style>{`
        #${SCANNER_ELEMENT_ID} video {
          transform: scaleX(-1) !important;
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>

      {/* SCANNER CONTAINER */}
      <div className="relative w-full aspect-square bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-sea-green-800">
        <div id={SCANNER_ELEMENT_ID} className="w-full h-full" />

        {/* OVERLAY RETICLE FOR SCANNING */}
        {isCameraActive && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-75 h-75 border-2 border-sea-green-400/50 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-sea-green-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-sea-green-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-sea-green-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-sea-green-400 rounded-br-lg" />

              <div className="w-full h-0.5 bg-linear-to-r from-transparent via-sea-green-400 to-transparent animate-pulse absolute top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        )}

        {/* ERROR STATE FOR CAMERA */}
        {cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900/90 text-white z-10">
            <p className="text-sm font-medium text-rose-400 mb-4">
              {cameraError}
            </p>
            <button
              onClick={startScanner}
              className="px-4 py-2 text-xs font-semibold text-white bg-sea-green-600 rounded-lg hover:bg-sea-green-500 transition-colors"
            >
              Coba lagi
            </button>
          </div>
        )}
      </div>

      {/* GEOLOCATION STATUS BADGE */}
      <div className="w-full p-3 rounded-xl bg-sea-green-900/60 border border-sea-green-800 text-xs text-sea-green-200">
        {isLocLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 border-2 border-sea-green-400 border-t-transparent rounded-full animate-spin" />
            <span>Menemukan Lokasi Anda...</span>
          </div>
        ) : locationError ? (
          <p className="text-rose-400 text-center font-medium">
            {locationError}
          </p>
        ) : (
          <div className="flex justify-between items-center px-1">
            <span className="font-semibold text-sea-green-300">
              GPS Status:
            </span>
            <span className="font-mono text-[11px] text-sea-green-100">
              {location.latitude?.toFixed(5)}, {location.longitude?.toFixed(5)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
