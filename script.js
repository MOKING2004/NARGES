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

const totalPhotos = photos.length;
let currentIndex = 0;

const slideshowImage = document.getElementById('slideshowImage');
const slideshowContainer = document.getElementById('slideshowContainer');

// ==================== نمایش تصویر فعلی ====================
function showPhoto(index) {
  currentIndex = ((index % totalPhotos) + totalPhotos) % totalPhotos;
  slideshowImage.src = photos[currentIndex];
}

// ==================== دکمه‌ها ====================
document.getElementById('nextBtn').addEventListener('click', () => {
  showPhoto(currentIndex + 1);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  showPhoto(currentIndex - 1);
});

// ==================== سوییپ ====================
let touchStartX = 0;
let touchEndX = 0;

slideshowContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slideshowContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      showPhoto(currentIndex + 1);
    } else {
      showPhoto(currentIndex - 1);
    }
  }
}, { passive: true });

// ==================== بارگذاری اولیه ====================
showPhoto(0);

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
  }, 20000);
}

function startMusic() {
  if (musicStarted) return;
  bgMusic.play().then(() => {
    musicStarted = true;
    playBtn.classList.add('playing');
    startPreloaderTimer();
  }).catch(() => {
    setTimeout(startMusic, 500);
  });
}

playBtn.addEventListener('click', startMusic);

window.addEventListener('load', () => {
  bgMusic.play().then(() => {
    musicStarted = true;
    playBtn.classList.add('playing');
    startPreloaderTimer();
  }).catch(() => {
    // autoplay بلاک شد، منتظر کلیک کاربر
  });
});

// ==================== پاکت نامه ====================
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
  if (envelope.classList.contains('open')) {
    setTimeout(() => {
      letter.style.display = 'block';
      letter.style.animation = 'none';
      letter.offsetHeight; // reflow
      letter.style.animation = 'letterReveal 0.6s ease';
    }, 500);
  } else {
    letter.style.display = 'none';
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
