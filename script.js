// ==================== عکس‌ها ====================
const photos = [
  "3D61D78D-4B60-444B-99C5-58F0787268BE.jpeg",
  "4E0A39C7-51DE-4E3D-89E4-171AE7329A61.jpeg",
  "F26E5507-45C7-463B-A0E6-F6C9420FE22A.jpeg",
  "IMG_0143.jpeg",
  "IMG_0144.jpeg",
  "IMG_0145.jpeg",
  "IMG_0146.jpeg",
  "IMG_0147.jpeg",
  "IMG_0149.jpeg",
  "IMG_0155.jpeg",
  "IMG_0302.jpeg",
  "IMG_0327.jpeg"
];

const totalSpreads = Math.ceil(photos.length / 2);
let currentSpread = 0;
let isAnimating = false;

const pageLeft = document.getElementById('pageLeft');
const pageRight = document.getElementById('pageRight');
const flipPage = document.getElementById('flipPage');
const bookContainer = document.getElementById('bookContainer');

// ==================== توابع آلبوم ====================
function updateSpread(spreadIndex, resetFlip = true) {
  currentSpread = ((spreadIndex % totalSpreads) + totalSpreads) % totalSpreads;
  const leftPhoto = photos[currentSpread * 2] || '';
  const rightPhoto = photos[currentSpread * 2 + 1] || '';

  pageLeft.innerHTML = leftPhoto ? `<img src="${leftPhoto}" alt="عکس">` : '';
  pageRight.innerHTML = rightPhoto ? `<img src="${rightPhoto}" alt="عکس">` : '';

  if (resetFlip) {
    flipPage.classList.remove('flipping-forward', 'flipping-backward');
    flipPage.style.transform = 'rotateY(0deg)';
    flipPage.innerHTML = '';
  }
  isAnimating = false;
}

function nextSpread() {
  if (isAnimating) return;
  isAnimating = true;

  const nextIndex = (currentSpread + 1) % totalSpreads;
  const nextRightPhoto = photos[nextIndex * 2 + 1] || photos[nextIndex * 2] || '';

  flipPage.innerHTML = nextRightPhoto ? `<img src="${nextRightPhoto}" alt="عکس">` : '';
  flipPage.classList.remove('flipping-backward');
  flipPage.classList.add('flipping-forward');

  setTimeout(() => {
    updateSpread(nextIndex, true);
  }, 550);
}

function prevSpread() {
  if (isAnimating) return;
  isAnimating = true;

  const prevIndex = (currentSpread - 1 + totalSpreads) % totalSpreads;
  const prevLeftPhoto = photos[prevIndex * 2] || '';

  flipPage.innerHTML = prevLeftPhoto ? `<img src="${prevLeftPhoto}" alt="عکس">` : '';
  flipPage.style.transform = 'rotateY(-180deg)';
  flipPage.classList.remove('flipping-forward');
  flipPage.classList.add('flipping-backward');

  setTimeout(() => {
    updateSpread(prevIndex, true);
  }, 550);
}

// دکمه‌ها
document.getElementById('nextBtn').addEventListener('click', nextSpread);
document.getElementById('prevBtn').addEventListener('click', prevSpread);

// مقداردهی اولیه
updateSpread(0, true);

// ==================== سوییپ ====================
let touchStartX = 0;
let touchEndX = 0;

bookContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

bookContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSpread();
    } else {
      prevSpread();
    }
  }
}, { passive: true });

// ==================== موزیک و پیش‌لودر ====================
const preloader = document.getElementById('preloader');
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('play-music-btn');
let musicStarted = false;
let preloaderTimer = null;

function startPreloaderTimer() {
  if (preloaderTimer) return;
  preloaderTimer = setTimeout(() => {
    preloader.classList.add('hidden');
  }, 20000); // 20 ثانیه بعد از شروع پخش موزیک
}

function startMusic() {
  if (musicStarted) return;
  bgMusic.play().then(() => {
    musicStarted = true;
    playBtn.classList.add('playing');
    startPreloaderTimer();
  }).catch(() => {
    // اگر باز هم fail شد، دوباره تلاش کن
    setTimeout(startMusic, 500);
  });
}

playBtn.addEventListener('click', startMusic);

// تلاش برای پخش خودکار (در صورت مجاز بودن مرورگر)
window.addEventListener('load', () => {
  bgMusic.play().then(() => {
    musicStarted = true;
    playBtn.classList.add('playing');
    startPreloaderTimer();
  }).catch(() => {
    // اگر autoplay بلاک شد، کاری نکن، منتظر کلیک کاربر روی دکمه پلی
  });
});

// ==================== نامه ====================
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

envelope.addEventListener('click', () => {
  if (letter.style.display === 'block') {
    letter.style.display = 'none';
  } else {
    letter.style.display = 'block';
    letter.style.animation = 'none';
    letter.offsetHeight; // reflow
    letter.style.animation = 'letterReveal 0.6s ease';
  }
});

// ==================== قلب‌ها و جرقه‌ها ====================
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols = ['💙', '🌹', '💗', '💕', '💖', '💘', '🤍', '🩵', '❤️'];

for (let i = 0; i < 30; i++) {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (16 + Math.random() * 24) + 'px';
  heart.style.animationDuration = (4 + Math.random() * 6) + 's';
  heart.style.animationDelay = (Math.random() * 5) + 's';
  heart.style.opacity = 0.3 + Math.random() * 0.5;
  heartsContainer.appendChild(heart);
}

for (let i = 0; i < 15; i++) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.animationDelay = (Math.random() * 3) + 's';
  sparkle.style.width = sparkle.style.height = (3 + Math.random() * 5) + 'px';
  document.body.appendChild(sparkle);
}
