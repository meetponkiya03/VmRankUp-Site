// Main JS Entry Point - VM RankUp SEO Agency
import { initNavbar } from './navbar.js';
import { initSlider } from './slider.js';
import { initFAQ } from './faq.js';
import { initCounter } from './counter.js';
import { initPortfolio } from './portfolio.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Submodules
  initNavbar();
  initSlider();
  initFAQ();
  initCounter();
  initPortfolio();
  initContact();

  // --- 1. GLOBAL SCROLL PROGRESS BAR ---
  const scrollProgressBar = document.getElementById('scroll-progress');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / windowHeight) * 100;
      scrollProgressBar.style.width = `${progress}%`;
    });
  }

  // --- 2. BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 3. SCROLL REVEAL ANIMATIONS (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, we don't need to observe it again
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px' // triggers slightly before scrolling fully in
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- 4. BUTTON RIPPLE EFFECT ---
  const rippleButtons = document.querySelectorAll('.btn-ripple');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // --- 5. INITIALIZE LUCIDE ICONS ---
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
