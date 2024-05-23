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

    if (deferredPrompt && !installPromptDismissed) {
      const timer = setTimeout(() => {
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
      }, 5000); 

      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, [deferredPrompt]);

  return null;
};

export default InstallPrompt;