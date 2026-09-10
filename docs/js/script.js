document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initBackToTop();
    initNavbarScroll();
    initScrollspy();
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
    initCounter();
    initAskQuestion();
});

/* --- Rain (now falling petals) --- */
function createRain() {
    const overlay = document.querySelector('.rain-overlay');
    for (let i = 0; i < 35; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.height = Math.random() * 10 + 7 + 'px';
        drop.style.width = Math.random() * 8 + 6 + 'px';
        drop.style.animationDuration = Math.random() * 5 + 6 + 's';
        drop.style.animationDelay = Math.random() * 12 + 's';
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
            ctx.fillStyle = `rgba(190, 150, 175, ${s.a})`;
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
            grad.addColorStop(0, `rgba(210, 130, 170, ${f.a})`);
            grad.addColorStop(1, 'rgba(210, 130, 170, 0)');
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

    document.querySelectorAll('.reason-card, .letter-line, .timeline-item, .counter-box, .ask-card').forEach(el => {
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
            const res = await fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message })
            });
            const data = await res.json();
            if (data.status === 'success') {
                showResponse('Message sent! Thank you ♥', true);
                form.reset();
                createHeartBurst();
            } else {
                showResponse(data.msg || 'Something went wrong.', false);
            }
        } catch {
            showResponse('Could not connect. Try again later.', false);
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
    const symbols = ['♥', '♡', '🌸', '🌷', '💖', '🌺', '✨'];
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

        const petalSymbols = ['♥', '🌸', '🌷', '💖', '🌺', '💕', '♡'];

        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
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

/* ==========================================================================
   PRO EDITION - preloader, scroll progress, back to top, nav polish,
   scrollspy, waiting counter, one last question
   ========================================================================== */

/* --- Preloader --- */
function initPreloader() {
    const pre = document.getElementById('preloader');
    if (!pre) return;

    function hide() {
        if (!pre.classList.contains('hidden')) pre.classList.add('hidden');
    }
    window.addEventListener('load', hide);
    setTimeout(hide, 3800);
}

/* --- Scroll progress bar --- */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function update() {
        const h = document.documentElement;
        const scrolled = h.scrollTop || document.body.scrollTop;
        const max = h.scrollHeight - h.clientHeight;
        bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* --- Back to top --- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        btn.classList.toggle('show', scrolled > 450);
    }, { passive: true });
}

/* --- Navbar solid state on scroll --- */
function initNavbarScroll() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        nav.classList.toggle('scrolled', scrolled > 40);
    }, { passive: true });
}

/* --- Scrollspy: highlight active nav link --- */
function initScrollspy() {
    const links = document.querySelectorAll('.nav-link, .side-link');
    if (!links.length) return;

    const map = {};
    links.forEach(link => { map[link.getAttribute('href')] = link; });

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => link.classList.remove('active'));
            const key = '#' + entry.target.id;
            if (map[key]) map[key].classList.add('active');
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}

/* --- Still Waiting live counter ---
   CHANGE THIS DATE to the day it ended: new Date('2026-09-10T00:00:00') */
function initCounter() {
    const el = {
        days: document.getElementById('countDays'),
        hours: document.getElementById('countHours'),
        mins: document.getElementById('countMins'),
        secs: document.getElementById('countSecs')
    };
    if (!el.days) return;

    const WAITING_SINCE = new Date('2026-09-10T00:00:00');

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
        const diff = Math.max(0, new Date() - WAITING_SINCE);
        const total = Math.floor(diff / 1000);
        el.days.textContent = Math.floor(total / 86400);
        el.hours.textContent = pad(Math.floor((total % 86400) / 3600));
        el.mins.textContent = pad(Math.floor((total % 3600) / 60));
        el.secs.textContent = pad(total % 60);
    }

    tick();
    setInterval(tick, 1000);
}

/* --- One Last Question trick --- */
function initAskQuestion() {
    const card = document.getElementById('askCard');
    const yesBtn = document.getElementById('askYes');
    const noBtn = document.getElementById('askNo');
    const reveal = document.getElementById('askReveal');
    if (!card || !yesBtn || !noBtn || !reveal) return;

    const msgs = [
        'No 🥺',
        'Are you sure? 🥺',
        'Really, really sure?',
        'Think about it one more time...',
        'My poor heart 💔',
        'The pink button is prettier 💖',
        "Okay, I'll cry now 😢",
        'Please? 🥹'
    ];
    let dodgeCount = 0;

    function dodge() {
        dodgeCount = Math.min(dodgeCount + 1, msgs.length - 1);
        noBtn.textContent = msgs[dodgeCount];

        const cardRect = card.getBoundingClientRect();
        const btnW = noBtn.offsetWidth;
        const maxDx = Math.max((cardRect.width - btnW) * 0.7, 60);
        const maxDy = Math.max(cardRect.height * 0.5, 60);
        const dx = (Math.random() * 2 - 1) * maxDx;
        const dy = (Math.random() * 2 - 1) * maxDy;
        noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('touchstart', dodge);
    noBtn.addEventListener('click', dodge);

    yesBtn.addEventListener('click', () => {
        yesBtn.disabled = true;
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        yesBtn.style.opacity = '0';
        document.querySelector('.ask-buttons').classList.add('answered');

        createHeartBurst();
        for (let i = 1; i <= 4; i++) {
            setTimeout(createHeartBurst, i * 260);
        }

        reveal.classList.add('show');
        setTimeout(() => {
            reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    });
}
