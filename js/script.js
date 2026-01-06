// ============================================
// THEME MANAGEMENT
// ============================================

const THEME_KEY = 'portfolio-theme';
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const themeLabel = themeToggle?.querySelector('.theme-label');

/**
 * Set the theme (light or dark)
 * @param {string} mode - 'light' or 'dark'
 */
const setTheme = (mode) => {
    const body = document.body;
    const isDark = mode === 'dark';

    body.setAttribute('data-theme', mode);

    if (isDark) {
        themeIcon && (themeIcon.textContent = '🌙');
        themeLabel && (themeLabel.textContent = 'Sombre');
    } else {
        themeIcon && (themeIcon.textContent = '☀️');
        themeLabel && (themeLabel.textContent = 'Clair');
    }

    localStorage.setItem(THEME_KEY, mode);

    // Dispatch custom event for other scripts to listen
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: mode } }));
};

/**
 * Initialize theme from storage or system preference
 */
const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
};

// Initialize theme on page load
initTheme();

// Theme toggle listener
themeToggle?.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// ============================================
// RESPONSIVE NAVIGATION
// ============================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    lastScrollTop = currentScroll;
});

// ============================================
// SMOOTH SCROLL & ACTIVE NAV LINK
// ============================================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach((item) => {
        item.style.color = '';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--brand)';
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
document.querySelectorAll('.project-card, .about-content, .fade-in-on-scroll').forEach((el) => {
    el.classList.add('fade-in-on-scroll');
    observer.observe(el);
});

// ============================================
// FLOATING ANIMATION RESPECT FOR PREFERS-REDUCED-MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Apply or remove animations based on user preference
if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-base', '0s');
} else {
    // Ensure smooth transitions are enabled
    document.documentElement.style.setProperty('--transition-base', '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
}

// Listen for changes in reduced motion preference
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.style.setProperty('--transition-base', '0s');
    } else {
        document.documentElement.style.setProperty('--transition-base', '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
    }
});

// ============================================
// DYNAMIC PROJECT CARD HOVER EFFECT
// ============================================

document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', function () {
        this.style.zIndex = 'auto';
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION: DEBOUNCE SCROLL
// ============================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based updates
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(
    '%c✨ Portfolio by Lydie Bouthviseth ✨',
    'font-size: 18px; font-weight: bold; color: #ff6bb3; text-shadow: 0 0 10px #7d8dff;'
);
console.log(
    '%cDesign inspired by 3D glossy balloon aesthetics',
    'font-size: 12px; color: #7d8dff;'
);

// ============================================
// DECORATIVE PARTICLES (FLOWERS & STARS) - DISABLED
// ============================================
// Animation des fleurs et étoiles désactivée

/*
const createParticles = () => {
    // Désactivé
};

const style = document.createElement('style');
style.textContent = ``;
document.head.appendChild(style);

createParticles();

window.addEventListener('themechange', () => {
    createParticles();
});
*/

