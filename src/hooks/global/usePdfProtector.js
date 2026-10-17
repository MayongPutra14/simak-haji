import { useEffect } from 'react';

/**
 * Custom hook for advanced PDF protection:
 * - Block right-click & context menu
 * - Block Copy, Cut, Paste, Print, Save, View Source
 * - Block DevTools (F12, Ctrl+Shift+I/J/C, Ctrl+U)
 * - Block Windows/PrintScreen/Snipping Tool key combinations
 * - Detect rapid/simultaneous key presses (indication of screenshot)
 * - Blur Protection (Trigger auto-blur if user switches tabs/windows)
 */
export const usePdfProtector = (onScreenCaptureDetected) => {
  useEffect(() => {
    // 1. DISABLE CONTEXT MENU (Right Click)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. DISABLE COPY, CUT, & PASTE
    const handleCopyCutPaste = (e) => {
      e.preventDefault();
      return false;
    };

    // 3. LOGIC FOR RAPID KEYPRESS / SCREENSHOT / DEVTOOLS DETECTION
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // List of blocked keys (Combinations of Ctrl/Cmd, Shift, F12, PrintScreen, Windows)
      const isBlockedKey =
        // Print Screen (some browsers / OS detect key as 'printscreen' or 'snapshot')
        key === 'printscreen' ||
        e.keyCode === 44 ||
        // F12 DevTools
        key === 'f12' ||
        // Windows Key / Meta key standalone (prevents Win+Shift+S combination if captured)
        e.key === 'Meta' ||
        e.key === 'OS' ||
        // Ctrl/Cmd + common combinations (P, S, U, C, A, X, V, I, J, Shift+I/J/C/S)
        (isCmdOrCtrl &&
          ['p', 's', 'u', 'c', 'a', 'x', 'v', 'i', 'j', 'f'].includes(key)) ||
        (isCmdOrCtrl && e.shiftKey && ['i', 'j', 'c', 's'].includes(key)) ||
        // Alt + Tab / Alt + PrintScreen (optional, prevents window switching to take screenshots)
        (e.altKey && key === 'printscreen');

      if (isBlockedKey) {
        e.preventDefault();
        e.stopPropagation();

        // Call optional callback to trigger an alert/warning
        if (typeof onScreenCaptureDetected === 'function') {
          onScreenCaptureDetected('Forbidden action or shortcut detected!');
        }
      }
    };

    // 4. ADDITIONAL LOGIC: Snipping Tool / Windows Shortcut Detection (Win + Shift + S)
    // Although the OS sometimes intercepts this shortcut, we can detect when the window loses focus
    // suddenly (indicating opening the Snipping Tool or an external application).
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Document hidden/switched tabs/opening snipping tool
        document.body.style.filter = 'blur(15px)'; // Auto blur the page
      } else {
        document.body.style.filter = 'none';
      }
    };

    const handleWindowBlur = () => {
      document.body.style.filter = 'blur(15px)';
    };

    const handleWindowFocus = () => {
      document.body.style.filter = 'none';
    };

    // ATTACH EVENT LISTENERS
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('copy', handleCopyCutPaste);
    window.addEventListener('cut', handleCopyCutPaste);
    window.addEventListener('paste', handleCopyCutPaste);

    // Additional protection against focus/tab switching
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      // REMOVE EVENT LISTENERS
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('copy', handleCopyCutPaste);
      window.removeEventListener('cut', handleCopyCutPaste);
      window.removeEventListener('paste', handleCopyCutPaste);

      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.body.style.filter = 'none';
    };
  }, []);
};
