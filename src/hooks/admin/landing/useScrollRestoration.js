import { useEffect } from 'react';

// SCROLL RESTORATION HOOK
export function useScrollRestoration(isReady = true) {
  useEffect(() => {
    // wait until content/data is fully loaded
    if (!isReady) return;

    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition !== null) {
      // scroll to saved position after layout finishes rendering
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, [isReady]);

  useEffect(() => {
    // save scroll position on beforeunload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}
