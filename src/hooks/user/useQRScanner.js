import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export const useQRScanner = (onScanSuccess, onScanError, isActive = true) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    // Initialize the scanner on the element with id "qr-reader"
    const html5QrCode = new Html5Qrcode('qr-reader');
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: 'environment' }, // Use back camera
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            // If scan is successful, stop the camera and return the result
            html5QrCode.stop().then(() => {
              onScanSuccess(decodedText);
            });
          },
          (errorMessage) => {
            if (onScanError) onScanError(errorMessage);
          },
        );
      } catch (err) {
        console.error('Failed to start scanner:', err);
      }
    };

    startScanner();

    // Cleanup function: Turn off the camera when the component is unmounted
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [onScanSuccess, onScanError, isActive]);

  return null;
};
