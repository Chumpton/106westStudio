// ===== Mobile Menu Toggle =====
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    // Change icon
    const isOpen = mobileMenu.classList.contains('active');
    mobileToggle.innerHTML = isOpen
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Shop Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Filter products
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== Custom Order Canvas Selection =====
const canvasOptions = document.querySelectorAll('.canvas-option');
const productTypeInput = document.getElementById('productType');

canvasOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Update active state
        canvasOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        // Update hidden input
        productTypeInput.value = option.dataset.product;
    });
});

// ===== Contact Form Submit =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! We will get back to you shortly.');
    contactForm.reset();
});

// ===== Order Form Submit =====
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const product = document.getElementById('productType').value;
    alert(`Thank you ${name}! Your custom ${product} order request has been received. We will contact you at ${email} to finalize the design.`);
    orderForm.reset();
});

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Ping Pong Video Logic =====
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('pingPongVideo');
    if (!video) return;

    let animationFrame;
    let lastTime = Date.now();
    let isReversing = false;

    const animateReverse = () => {
        const now = Date.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        if (video.currentTime <= 0) {
            video.currentTime = 0;
            video.playbackRate = 1;
            video.play();
            isReversing = false;
            return;
        }

        video.currentTime -= dt * 1.5;
        if (isReversing) {
            animationFrame = requestAnimationFrame(animateReverse);
        }
    };

    video.addEventListener('ended', () => {
        video.pause();
        isReversing = true;
        lastTime = Date.now();
        animationFrame = requestAnimationFrame(animateReverse);
    });

    video.muted = true;
    video.play().catch(e => console.log('Autoplay blocked', e));
});
