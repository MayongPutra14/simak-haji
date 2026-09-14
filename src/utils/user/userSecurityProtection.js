import { useEffect, useState } from 'react';

export const useSecurityProtection = () => {
  const [isBlackout, setIsBlackout] = useState(false);

  useEffect(() => {
    // 1. Blokir Klik Kanan (Context Menu)
    const handleContextMenu = (e) => e.preventDefault();

    // 2. Blokir Drag & Select Teks
    const handleDragAndSelect = (e) => e.preventDefault();

    // 3. Blokir Shortcut Keyboard (F12, Save, Print, DevTools, View Source)
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
      }
      // Ctrl/Cmd + Shift + I/J/C (Windows & Mac DevTools)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)
      ) {
        e.preventDefault();
      }
      // Mac Cmd + Option + I/J
      if (e.metaKey && e.altKey && ['I', 'J', 'i', 'j'].includes(e.key)) {
        e.preventDefault();
      }
      // Ctrl/Cmd + U (View Source), P (Print), S (Save), C (Copy)
      if (
        (e.ctrlKey || e.metaKey) &&
        ['U', 'P', 'S', 'C', 'u', 'p', 's', 'c'].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    // 4. Deteksi Multi-Touch (Screenshot 3 Jari di Mobile/Tablet)
    const handleTouchStart = (e) => {
      if (e.touches.length >= 3) {
        setIsBlackout(true);
        // Hapus blackout setelah 3 detik
        setTimeout(() => setIsBlackout(false), 3000);
      }
    };

    // 5. Deteksi Kehilangan Fokus & Snipping Tool (Window Blur / Visibility)
    const handleBlur = () => setIsBlackout(true);
    const handleFocus = () => setIsBlackout(false);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlackout(true);
      } else {
        setIsBlackout(false);
      }
    };

    // 6. Deteksi DevTools Docking via Resize (Perbedaan inner vs outer window)
    const detectDevToolsResize = () => {
      const threshold = 160; // Margin aman resolusi toolbar browser
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        // Asumsi DevTools dibuka di samping atau bawah
        setIsBlackout(true);
      }
    };

    // --- Registrasi Event Listeners ---
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleDragAndSelect);
    document.addEventListener('dragstart', handleDragAndSelect);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('resize', detectDevToolsResize);

    // Initial check untuk DevTools
    detectDevToolsResize();

    // --- Cleanup ---
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleDragAndSelect);
      document.removeEventListener('dragstart', handleDragAndSelect);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('resize', detectDevToolsResize);
    };
  }, []);

  return { isBlackout };
};
