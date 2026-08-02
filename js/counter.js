// Client Success Metrics & Statistics Counter Animation

export function initCounter() {
  const counters = document.querySelectorAll('[data-counter-target]');

  if (counters.length === 0) return;

  const countOptions = {
    threshold: 0.5, // starts counting when 50% of the element is visible
    rootMargin: "0px"
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterEl = entry.target;
        const targetValue = parseInt(counterEl.getAttribute('data-counter-target'), 10);
        const prefix = counterEl.getAttribute('data-counter-prefix') || '';
        const suffix = counterEl.getAttribute('data-counter-suffix') || '';
        const duration = parseInt(counterEl.getAttribute('data-counter-duration'), 10) || 2000; // in milliseconds

        animateCounter(counterEl, targetValue, duration, prefix, suffix);
        observer.unobserve(counterEl); // stop observing once animated
      }
    });
  }, countOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  function animateCounter(element, target, duration, prefix, suffix) {
    let startTimestamp = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * (target - startValue) + startValue);

      element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    }

    window.requestAnimationFrame(step);
  }
}
