let isMusicPlaying = true;
const MINNIE_IMAGES_COUNT = 9;

document.addEventListener('DOMContentLoaded', () => {
     
  initializeCountdown();
  initializeMapModal();
  initializeMusic();
});

/* 🎵 Música */

function initializeMusic() {
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('background-music');
  const status = document.getElementById('music-status');

  if (!btn || !audio || !status) {
    console.warn('No se encontró botón o audio');
    return;
  }

  audio.volume = 0.5;
  audio.muted = false;
  isMusicPlaying = false;
  status.textContent = 'Música: OFF';

  btn.addEventListener('click', async () => {
    try {
      if (!isMusicPlaying) {
        await audio.play(); // ← CLAVE
        isMusicPlaying = true;
        status.textContent = 'Música: ON';
      } else {
        audio.pause();
        isMusicPlaying = false;
        status.textContent = 'Música: OFF';
      }
    } catch (err) {
      console.error('Audio bloqueado:', err);
      alert('⚠️ El navegador bloqueó el audio. Intenta tocar la pantalla otra vez.');
    }
  });
}



/* ⏳ CONTADOR */
function initializeCountdown() {
  const target = new Date('February 7, 2026 16:00:00').getTime();

  setInterval(() => {
    const now = Date.now();
    const diff = target - now;

    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');

    if (!d || !h || !m || !s) {
      console.warn('Contador: elementos no encontrados');
      return;
    }

    if (diff <= 0) {
      d.textContent = h.textContent = m.textContent = s.textContent = '00';
      return;
    }

    d.textContent = Math.floor(diff / 86400000);
    h.textContent = Math.floor(diff / 3600000 % 24);
    m.textContent = Math.floor(diff / 60000 % 60);
    s.textContent = Math.floor(diff / 1000 % 60);
  }, 1000);
}

/* 📍 MODAL UBICACIÓN */
function initializeMapModal() {
  const btn = document.getElementById('map-btn');
  const modal = document.getElementById('map-modal');
  const close = document.querySelector('.close-modal');

  if (!btn || !modal || !close) {
    console.warn('Mapa: elementos no encontrados');
    return;
  }

  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}


/* 🎉 Bienvenida */
function loadInitialData() {
  setTimeout(() => {
    showNotification('¡Estás invitado al cumpleaños de Sofi! 🎀');
    createConfetti();
  }, 1200);
}

/* 🎊 Confeti */
function createConfetti() {
  const colors = ['#ff69b4', '#ff1493', '#ff6b6b'];
  for (let i = 0; i < 20; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed;
      width:10px;
      height:10px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      top:-20px;
      z-index:9999;
    `;
    document.body.appendChild(c);
    c.animate(
      [{ transform: 'translateY(0)', opacity: 1 },
       { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }],
      { duration: 2000 }
    );
    setTimeout(() => c.remove(), 2000);
  }
}

/* 🔔 Notificación */
function showNotification(text) {
  const n = document.createElement('div');
  n.textContent = text;
  n.className = 'notification';
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3000);
}
