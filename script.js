document.addEventListener('DOMContentLoaded', () => {

    // --- AOS (SCROLL REVEAL) INITIALIZATION ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- PARTICLES.JS INITIALIZATION ---
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f5a0" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#0079ff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // --- CUSTOM MAGNETIC CURSOR ---
    const cursor = document.getElementById('customCursor');
    if(window.innerWidth > 768 && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        const clickables = document.querySelectorAll('a, button, .glow-card, input, textarea, .tech-item');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // --- PREMIUM MOUSE-TRACKING SPOTLIGHT ENGINE ---
    const cards = document.querySelectorAll('.glow-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Technical Skills Reset Engine ---
    const techCards = document.querySelectorAll('.tech-item');
    const techTimeouts = new Map();

    function activateTechCard(card) {
        if (techTimeouts.has(card)) {
            clearTimeout(techTimeouts.get(card));
        }
        card.classList.add('activated');
        const resetTimeout = setTimeout(() => {
            card.classList.remove('activated');
            techTimeouts.delete(card);
        }, 500);
        techTimeouts.set(card, resetTimeout);
    }

    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => activateTechCard(card));
        card.addEventListener('touchstart', (e) => activateTechCard(card), {passive: true});
    });

    // --- Terminal System Handler ---
    const terminalBox = document.getElementById('terminalBox');
    if (terminalBox) {
        terminalBox.addEventListener('click', () => {
            const body = terminalBox.querySelector('.terminal-body');
            body.style.opacity = '0.3';
            setTimeout(() => { body.style.opacity = '1'; }, 200);
        });
    }

    // --- Theme Toggle Button ---
    const themeToggle = document.getElementById('themeToggle');
    function updateThemeIcon() {
        if (!themeToggle) return;
        themeToggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    }

    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
        updateThemeIcon();

        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('animating');
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateThemeIcon();
            
            setTimeout(() => {
                themeToggle.classList.remove('animating');
            }, 500);
        });
    }

    // --- Premium Live Filter Interaction ---
    const filterTags = document.querySelectorAll('.filter-tag');
    const boxContainer = document.getElementById('projectPlaceholderBox');
    const mockCards = document.querySelectorAll('.mock-dashboard-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const filterTarget = tag.getAttribute('data-target');
            
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            boxContainer.style.opacity = '0.3';
            
            setTimeout(() => {
                mockCards.forEach(card => {
                    const cardFilter = card.getAttribute('data-filter');
                    if (filterTarget === 'all' || cardFilter === filterTarget) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                boxContainer.style.opacity = '1';
            }, 250);
        });
    });

    // --- Slide Transitions Controller ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetSliderTimer(); });
        prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); resetSliderTimer(); });
    }

    function startSliderTimer() { slideInterval = setInterval(nextSlide, 5000); }
    function resetSliderTimer() { clearInterval(slideInterval); startSliderTimer(); }
    startSliderTimer();

    // --- ANIMATED NUMBER COUNTER (Impact Metrics) ---
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger animation only when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect(); 
        }
    }, { threshold: 0.5 });
    
    if(document.querySelector('.impact-section')) {
        observer.observe(document.querySelector('.impact-section'));
    }

});
