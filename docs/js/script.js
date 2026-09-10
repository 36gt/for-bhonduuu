document.addEventListener('DOMContentLoaded', () => {
    createRain();
    createFloatingHearts();
    initStars();
    initTypewriter();
    initSlideshow();
    initScrollAnimations();
    initMusicPlayer();
    initGiftBox();
    setupForm();
    initCursorTrail();
    initClickHearts();
    initParallax();
    initGlowOnScroll();
    initSideMenu();
    initSpider();
});

/* --- Rain --- */
function createRain() {
    const overlay = document.querySelector('.rain-overlay');
    for (let i = 0; i < 60; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.height = Math.random() * 80 + 40 + 'px';
        drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        overlay.appendChild(drop);
    }
}

/* --- Floating Hearts --- */
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const symbols = ['♥', '♡', '❤', '💕'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 8 + 8 + 's';
        heart.style.fontSize = Math.random() * 15 + 12 + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 18000);
    }, 800);
}

/* --- Stars & Fireflies --- */
function initStars() {
    const canvas = document.getElementById('starsCanvas');
    const ctx = canvas.getContext('2d');
    let w, h;
    const stars = [];
    const fireflies = [];

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.5 + 0.5,
            a: Math.random(),
            da: (Math.random() - 0.5) * 0.02
        });
    }

    for (let i = 0; i < 15; i++) {
        fireflies.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 3 + 1,
            a: 0,
            da: Math.random() * 0.03 + 0.01
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        stars.forEach(s => {
            s.a += s.da;
            if (s.a > 1 || s.a < 0.2) s.da = -s.da;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 197, 226, ${s.a})`;
            ctx.fill();
        });

        fireflies.forEach(f => {
            f.a += f.da;
            if (f.a > 0.8 || f.a < 0) f.da = -f.da;
            f.x += f.vx;
            f.y += f.vy;
            if (f.x < 0 || f.x > w) f.vx = -f.vx;
            if (f.y < 0 || f.y > h) f.vy = -f.vy;

            const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 4);
            grad.addColorStop(0, `rgba(232, 160, 191, ${f.a})`);
            grad.addColorStop(1, 'rgba(232, 160, 191, 0)');
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }
    draw();
}

/* --- Typewriter --- */
function initTypewriter() {
    const title = document.getElementById('heroTitle');
    const sub = document.getElementById('heroSub');
    const titleText = 'Hey Bhonduuu...';
    const subText = 'I know I messed up. This is for you, and only you.';

    let cursor = document.createElement('span');
    cursor.className = 'cursor';
    title.appendChild(cursor);

    let ti = 0;
    function typeTitle() {
        if (ti < titleText.length) {
            title.textContent = titleText.substring(0, ti + 1);
            title.appendChild(cursor);
            ti++;
            setTimeout(typeTitle, 100 + Math.random() * 80);
        } else {
            setTimeout(() => {
                cursor.remove();
                typeSub();
            }, 600);
        }
    }

    let si = 0;
    function typeSub() {
        const c = document.createElement('span');
        c.className = 'cursor';
        if (si < subText.length) {
            sub.textContent = subText.substring(0, si + 1);
            sub.appendChild(c);
            si++;
            setTimeout(typeSub, 50 + Math.random() * 40);
        } else {
            setTimeout(() => c.remove(), 1000);
        }
    }

    setTimeout(typeTitle, 500);
}

/* --- Slideshow --- */
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideDots');
    let current = 0;
    let autoSlide;

    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
        resetAuto();
    }

    function next() { goTo((current + 1) % slides.length); }
    function prev() { goTo((current - 1 + slides.length) % slides.length); }

    document.getElementById('nextBtn').addEventListener('click', next);
    document.getElementById('prevBtn').addEventListener('click', prev);

    function resetAuto() {
        clearInterval(autoSlide);
        autoSlide = setInterval(next, 4000);
    }
    resetAuto();
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reason-card, .letter-line').forEach(el => {
        observer.observe(el);
    });
}

/* --- Music --- */
function initMusicPlayer() {
    const btn = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    let playing = false;

    btn.addEventListener('click', () => {
        if (playing) {
            audio.pause();
            btn.classList.remove('playing');
            btn.textContent = '♪';
        } else {
            audio.volume = 0.3;
            audio.play().catch(() => {});
            btn.classList.add('playing');
            btn.textContent = '♫';
        }
        playing = !playing;
    });
}

/* --- Gift Box --- */
function initGiftBox() {
    const lid = document.getElementById('giftLid');
    const content = document.getElementById('giftContent');

    if (!lid || !content) return;

    lid.addEventListener('click', (e) => {
        createGiftExplosion(e.clientX, e.clientY);
        createHeartBurst();
        createSparkles(e.clientX, e.clientY);

        // Screen shake
        document.body.style.animation = 'none';
        document.body.offsetHeight; // reflow
        document.body.style.animation = 'screen-shake 0.5s ease';

        setTimeout(() => {
            lid.classList.add('opened');
            content.classList.add('opened');
            document.body.style.animation = '';
        }, 400);
    });
}

function createGiftExplosion(cx, cy) {
    const container = document.getElementById('heartsContainer');
    const colors = ['#e8a0bf', '#f5c6d6', '#b76e9a', '#a78bfa', '#ff6b9d', '#fff'];
    const symbols = ['♥', '♡', '✦', '✧', '★', '·', '❤', '💕', '🎀', '✨'];

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-heart';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = cx + 'px';
        particle.style.top = cy + 'px';
        particle.style.position = 'fixed';
        particle.style.fontSize = Math.random() * 16 + 10 + 'px';
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animation = 'none';
        particle.style.zIndex = '9999';

        const angle = (Math.PI * 2 * i) / 40;
        const velocity = Math.random() * 300 + 150;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        const rotation = Math.random() * 720 - 360;
        const duration = Math.random() * 1000 + 800;

        container.appendChild(particle);

        particle.animate([
            { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg) scale(0)`, opacity: 0 }
        ], { duration, easing: 'cubic-bezier(0, 0.9, 0.57, 1)', fill: 'forwards' });

        setTimeout(() => particle.remove(), duration);
    }
}

function createSparkles(cx, cy) {
    const container = document.getElementById('heartsContainer');

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = cx + (Math.random() - 0.5) * 200 + 'px';
        sparkle.style.top = cy + (Math.random() - 0.5) * 200 + 'px';
        sparkle.style.width = Math.random() * 4 + 2 + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.background = '#fff';
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 6px #e8a0bf, 0 0 12px #e8a0bf';
        sparkle.style.zIndex = '9999';
        sparkle.style.pointerEvents = 'none';

        container.appendChild(sparkle);

        sparkle.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(1.5)', opacity: 0.8 },
            { transform: 'scale(0)', opacity: 0 }
        ], { duration: Math.random() * 600 + 400, easing: 'ease-out', fill: 'forwards' });

        setTimeout(() => sparkle.remove(), 1200);
    }
}

/* --- Crawling Spider --- */
function initSpider() {
    const spider = document.getElementById('crawlingSpider');
    if (!spider) return;

    let x = Math.random() * window.innerWidth * 0.7;
    let y = Math.random() * window.innerHeight * 0.5;
    let angle = 0;
    let targetX, targetY;
    let legSwap = false;

    spider.style.left = x + 'px';
    spider.style.top = y + 'px';

    function pickTarget() {
        targetX = Math.random() * window.innerWidth;
        targetY = Math.random() * window.innerHeight;
    }
    pickTarget();

    function move() {
        const dx = targetX - x;
        const dy = targetY - y;
        const dist = Math.hypot(dx, dy);

        if (dist < 30) {
            pickTarget();
        } else {
            const speed = 1.2;
            x += (dx / dist) * speed;
            y += (dy / dist) * speed;
            angle = Math.atan2(dy, dx) * 180 / Math.PI;
        }

        spider.style.left = x + 'px';
        spider.style.top = y + 'px';
        spider.style.transform = `rotate(${angle + 90}deg)`;

        // Alternate leg animation for walking feel
        legSwap = !legSwap;
        const legs = spider.querySelectorAll('.spider-leg');
        legs.forEach((leg, i) => {
            leg.style.animationPlayState = legSwap ? 'running' : 'paused';
        });

        requestAnimationFrame(move);
    }

    move();
}

/* --- Form --- */
function setupForm() {
    const form = document.getElementById('messageForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        if (!name || !message) {
            showResponse('Please fill in all fields.', false);
            return;
        }

        const btn = form.querySelector('.send-btn');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const res = await fetch('https://formsubmit.co/ajax/vexxor815@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    message: message,
                    _subject: 'A message from ' + name + ' on the patchup site!'
                })
            });
            const data = await res.json();
            if (data.success === 'true' || data.success === true) {
                showResponse('Message sent! I\'ll get it by email ♥', true);
                form.reset();
                createHeartBurst();
            } else {
                showResponse('Message received but could not email. Try again or message me directly.', false);
            }
        } catch {
            showResponse('Could not connect. Try again later, or message me directly ♥', false);
        }

        btn.textContent = 'Send with Love ♥';
        btn.disabled = false;
    });
}

function showResponse(msg, success) {
    const el = document.getElementById('formResponse');
    el.textContent = msg;
    el.style.color = success ? '#e8a0bf' : '#ff6b6b';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 4000);
}

function createHeartBurst() {
    const container = document.getElementById('heartsContainer');
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '♥';
        heart.style.left = (50 + (Math.random() - 0.5) * 20) + '%';
        heart.style.bottom = '20%';
        heart.style.animationDuration = '3s';
        heart.style.fontSize = '18px';
        heart.style.opacity = '0.6';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

/* --- Cursor heart trail --- */
function initCursorTrail() {
    const container = document.getElementById('heartsContainer');
    const symbols = ['♥', '♡', '✧', '·', '✦'];
    let lastX, lastY, lastTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 60) return;
        lastTime = now;

        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.bottom = 'auto';
        heart.style.fontSize = '10px';
        heart.style.opacity = '0.4';
        heart.style.zIndex = '9998';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'none';

        container.appendChild(heart);

        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0.4 },
            { transform: 'translate(' + (Math.random() * 30 - 15) + 'px, ' + (Math.random() * -30 - 10) + 'px) scale(0)', opacity: 0 }
        ], { duration: 700, easing: 'ease-out', fill: 'forwards' });

        setTimeout(() => heart.remove(), 700);
    });
}

/* --- Click anywhere spawns hearts --- */
function initClickHearts() {
    const container = document.getElementById('heartsContainer');

    document.addEventListener('click', (e) => {
        const isButton = e.target.closest('.gift-lid, button, .send-btn, a');
        if (isButton) return;

        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '♥';
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.bottom = 'auto';
            heart.style.fontSize = Math.random() * 14 + 10 + 'px';
            heart.style.color = ['#e8a0bf', '#f5c6d6', '#a78bfa'][Math.floor(Math.random() * 3)];
            heart.style.zIndex = '9998';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'none';

            container.appendChild(heart);

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 60 + 30;

            heart.animate([
                { transform: 'translate(0, 0) scale(0.8)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 30}px) scale(1.1)`, opacity: 0.8 },
                { transform: `translate(${Math.cos(angle) * dist * 1.5}px, ${Math.sin(angle) * dist - 80}px) scale(0)`, opacity: 0 }
            ], { duration: 900, easing: 'ease-out', fill: 'forwards' });

            setTimeout(() => heart.remove(), 900);
        }
    });
}

/* --- Parallax floating effect on section titles --- */
function initParallax() {
    window.addEventListener('scroll', () => {
        const titles = document.querySelectorAll('.section-title');
        titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / window.innerHeight;
            if (progress > 0 && progress < 1) {
                title.style.transform = `translateY(${(progress - 0.5) * 20}px)`;
                title.style.textShadow = `0 ${(progress - 0.5) * 10}px ${Math.abs(progress - 0.5) * 40 + 20}px rgba(232, 160, 191, ${Math.abs(progress - 0.5) * 0.5})`;
            }
        });
    }, { passive: true });
}

/* --- Glow pulse on section titles --- */
function initGlowOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('glowing');
                setTimeout(() => entry.target.classList.remove('glowing'), 1500);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-title, .reason-card, .memory-card').forEach(el => {
        observer.observe(el);
    });
}

/* --- Side Menu --- */
function initSideMenu() {
    const btn = document.getElementById('sideMenuBtn');
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('sideMenuClose');

    if (!btn || !menu) return;

    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('show');
        btn.classList.add('open');
    }

    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('show');
        btn.classList.remove('open');
    }

    btn.addEventListener('click', () => {
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.side-link').forEach(link => {
        link.addEventListener('click', () => setTimeout(closeMenu, 300));
    });
}
