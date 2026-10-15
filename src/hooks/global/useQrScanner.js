import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

// QR SCANNER HOOK
export default function useQrScanner({
  elementId,
  onScanSuccess,
  onScanError,
}) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const scannerRef = useRef(null);
  const isStartingRef = useRef(false);

  // FORCE STOP MEDIA TRACKS
  const stopMediaTracks = useCallback(() => {
    const videoElement = document.querySelector(`#${elementId} video`);
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      // stop all active video tracks from hardware camera
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      videoElement.srcObject = null;
    }
  }, [elementId]);

  // STOP CAMERA SCANNER
  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          // stop scanner instance gracefully
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (_err) {
        // ignore abort or cleanup errors during unmount
      } finally {
        // explicitly turn off hardware camera stream
        stopMediaTracks();
        scannerRef.current = null;
        setIsCameraActive(false);
        isStartingRef.current = false;
      }
    }
  }, [stopMediaTracks]);

  // START CAMERA SCANNER
  const startScanner = useCallback(async () => {
    if (!elementId || isStartingRef.current) return;

    try {
      isStartingRef.current = true;
      setCameraError(null);

      // clean up any existing instance before starting new session
      await stopScanner();

      const html5QrCode = new Html5Qrcode(elementId);
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0,
      };

      // request environment camera stream
      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText, decodedResult) => {
          // handle successful scan output
          if (onScanSuccess) {
            onScanSuccess(decodedText, decodedResult);
          }
        },
        (errorMessage) => {
          // handle scanning noise or frame decoding failure
          if (onScanError) {
            onScanError(errorMessage);
          }
        },
      );

      setIsCameraActive(true);
    } catch (err) {
      // handle permission denied or stream play interruption
      if (err?.name !== 'AbortError') {
        setCameraError(
          'Failed to access camera. Please check camera permissions.',
        );
      }
      setIsCameraActive(false);
    } finally {
      isStartingRef.current = false;
    }
  }, [elementId, onScanSuccess, onScanError, stopScanner]);

  // AUTOMATIC CLEANUP ON UNMOUNT
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [stopScanner]);

  return {
    isCameraActive,
    cameraError,
    startScanner,
    stopScanner,
  };
}
