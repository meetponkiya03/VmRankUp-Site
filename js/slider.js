// Responsive Client Testimonial Slider

export function initSlider() {
  const track = document.querySelector('[data-testimonial-track]');
  const slides = Array.from(document.querySelectorAll('[data-testimonial-slide]'));
  const nextBtn = document.querySelector('[data-testimonial-next]');
  const prevBtn = document.querySelector('[data-testimonial-prev]');
  const dotsContainer = document.querySelector('[data-testimonial-dots]');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000; // 5 seconds
  let dots = [];

  // Create indicator dots dynamically
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
        idx === 0 ? 'bg-primary w-6' : 'bg-slate-300 hover:bg-slate-400'
      }`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function updateSliderPosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots state
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('bg-primary', 'w-6');
        dot.classList.remove('bg-slate-300');
      } else {
        dot.classList.remove('bg-primary', 'w-6');
        dot.classList.add('bg-slate-300');
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    updateSliderPosition();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Swipe gesture support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped Left
      nextSlide();
      resetAutoPlay();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped Right
      prevSlide();
      resetAutoPlay();
    }
  }

  // Autoplay functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Hover overrides auto play
  const container = track.parentElement;
  if (container) {
    container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    container.addEventListener('mouseleave', startAutoPlay);
  }

  // Initialize
  updateSliderPosition();
  startAutoPlay();
}
