if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((reg) => console.log('PWA Service Worker registered! Scope:', reg.scope))
      .catch((err) => console.error('PWA Registration failed:', err));
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn) {
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});