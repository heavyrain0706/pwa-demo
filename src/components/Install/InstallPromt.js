import { useEffect, useState } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    const handleFirstUserAction = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          setDeferredPrompt(null);
        });
      }
      window.removeEventListener('touchstart', handleFirstUserAction);
      window.removeEventListener('click', handleFirstUserAction);
    };

    window.addEventListener('touchstart', handleFirstUserAction);
    window.addEventListener('click', handleFirstUserAction);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      window.removeEventListener('touchstart', handleFirstUserAction);
      window.removeEventListener('click', handleFirstUserAction);
    };
  }, [deferredPrompt]);

  return null;
};

export default InstallPrompt;