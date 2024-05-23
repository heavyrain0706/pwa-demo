import { useEffect, useState } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const installPromptDismissed = localStorage.getItem('installPromptDismissed') === 'true';

    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      if (!installPromptDismissed) {
        setDeferredPrompt(e);
      }
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallTouch = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
          localStorage.setItem('installPromptDismissed', 'true');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      {deferredPrompt && (
        <button onTouchEnd={handleInstallTouch}>
          Установить приложение
        </button>
      )}
    </div>
  );
};

export default InstallPrompt;