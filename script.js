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
let isAnimating = false;

const carouselTrack = document.getElementById('carouselTrack');

// ==================== ساخت کاروسل ====================
function buildCarousel() {
  carouselTrack.innerHTML = '';
  const total = totalPhotos;

  for (let i = 0; i < total; i++) {
    const item = document.createElement('div');
    item.classList.add('carousel-item');
    item.dataset.index = i;

    const img = document.createElement('img');
    img.src = photos[i];
    img.alt = 'عکس';

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    item.appendChild(img);
    item.appendChild(overlay);

    carouselTrack.appendChild(item);
  }

  updateCarousel();
}

// ==================== به‌روزرسانی کاروسل ====================
function updateCarousel() {
  const items = carouselTrack.querySelectorAll('.carousel-item');

  items.forEach((item) => {
    const idx = parseInt(item.dataset.index);
    item.classList.remove('side', 'active');

    if (idx === currentIndex) {
      item.classList.add('active');
    } else if (
      idx === (currentIndex - 1 + totalPhotos) % totalPhotos ||
      idx === (currentIndex + 1) % totalPhotos
    ) {
      item.classList.add('side');
    }
  });

  // محاسبه موقعیت آیتم فعال برای وسط چین کردن
  const activeItem = carouselTrack.querySelector('.active');
  if (activeItem) {
    const containerWidth = carouselTrack.parentElement.offsetWidth;
    const activeWidth = activeItem.offsetWidth;
    const leftOffset = (containerWidth - activeWidth) / 2;

    let offset = 0;
    for (let i = 0; i < currentIndex; i++) {
      const item = carouselTrack.querySelector(`.carousel-item[data-index="${i}"]`);
      if (item) {
        offset += item.offsetWidth;
      }
    }

    const translateX = leftOffset - offset;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
  }
}

// دکمه‌ها
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

function nextSlide() {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex + 1) % totalPhotos;
  updateCarousel();
  setTimeout(() => {
    isAnimating = false;
  }, 400);
}

function prevSlide() {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
  updateCarousel();
  setTimeout(() => {
    isAnimating = false;
  }, 400);
}

// ==================== سوییپ ====================
const carouselContainer = document.getElementById('carouselContainer');
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}, { passive: true });

// ==================== مقداردهی اولیه ====================
buildCarousel();

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
