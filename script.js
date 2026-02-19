/* ================= MUSIC ================= */
const music = document.getElementById('bgMusic');
const overlay = document.getElementById('musicOverlay');
const musicBtn = document.getElementById('musicBtn');

let isPlaying = false;

function fadeInMusic() {
    music.volume = 0;
    music.play().then(() => {
        let v = 0;
        const fade = setInterval(() => {
            v += 0.02;
            music.volume = Math.min(v, 0.6);
            if (v >= 0.6) clearInterval(fade);
        }, 100);
    });
}

/* KLIK HATI */
overlay.addEventListener('click', () => {
    if (isPlaying) return;
    isPlaying = true;
    fadeInMusic();
    overlay.classList.add('hide');
});

/* TOMBOL MUSIK */
musicBtn.addEventListener('click', () => {
    if (music.paused) {
        fadeInMusic();
        musicBtn.textContent = '⏸️';
    } else {
        music.pause();
        musicBtn.textContent = '🎵';
    }
});

/* ================= HEART FALL (2 EMOJI) ================= */
const hearts = document.getElementById('heartsContainer');

setInterval(() => {
    const h = document.createElement('div');
    h.innerHTML = Math.random() > 0.5 ? '💙' : '💖';
    h.style.position = 'absolute';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.top = '-10vh';
    h.style.fontSize = Math.random() * 18 + 12 + 'px';
    h.style.opacity = Math.random() * 0.6 + 0.4;
    h.style.animation = 'fall 6s linear';
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 6000);
}, 400);

/* ================= ORBIT GALLERY ================= */
const cards = document.querySelectorAll('.photo-card');
let angle = 0;
const step = (Math.PI * 2) / cards.length;

/* orbit memanjang */
const radiusX = 520;
const radiusZ = 420;

function updateOrbit() {
    let maxZ = -Infinity;
    let centerIndex = 0;

    /* cari foto PALING DEPAN */
    cards.forEach((card, i) => {
        const z = Math.cos(angle + step * i) * radiusZ;
        if (z > maxZ) {
            maxZ = z;
            centerIndex = i;
        }
    });

    cards.forEach((card, i) => {
        const a = angle + step * i;
        const x = Math.sin(a) * radiusX;
        const z = Math.cos(a) * radiusZ;

        /* SEMUA FOTO UKURAN SAMA (DEFAULT) */
        card.style.transform = `
            translate(-50%, -50%)
            translateX(${x}px)
            translateZ(${z}px)
            scale(0.9)
        `;
        card.style.filter = 'blur(4px)';
        card.style.opacity = 0.45;
        card.style.zIndex = 1;

        /* HANYA FOTO TENGAH */
        if (i === centerIndex) {
            card.style.transform = `
                translate(-50%, -50%)
                translateX(${x}px)
                translateZ(${z}px)
                scale(1.12)
            `;
            card.style.filter = 'blur(0)';
            card.style.opacity = 1;
            card.style.zIndex = 3;
        }
    });
}

function nextSlide() {
    angle -= step;
    updateOrbit();
}

setInterval(nextSlide, 3800);
updateOrbit();

/* ================= SWIPE MOBILE ================= */
let startX = 0;
const gallery = document.querySelector('.gallery');

gallery.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

gallery.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
        diff < 0 ? nextSlide() : (angle += step, updateOrbit());
    }
});

/* ================= ANTI ZOOM ================= */
document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('gesturestart', e => e.preventDefault());

/* ================= EXTRA FALLING HEARTS ================= */
const extraHearts = ['💙', '💖'];

setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = extraHearts[Math.floor(Math.random() * extraHearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 16 + 14 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's';
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}, 450);
