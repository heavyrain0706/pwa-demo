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

    const clickHandler = () => {
      if (deferredPrompt && !installPromptDismissed) {
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

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    document.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
      document.removeEventListener('click', clickHandler);
    };
  }, [deferredPrompt]);

  return null;
};

export default InstallPrompt;