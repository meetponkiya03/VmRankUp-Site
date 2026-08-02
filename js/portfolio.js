// Case Studies Filtering

export function initPortfolio() {
  const filterBtns = document.querySelectorAll('[data-portfolio-filter]');
  const items = document.querySelectorAll('[data-portfolio-item]');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-50');
      });
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-50');
      btn.classList.add('bg-primary', 'text-white', 'shadow-md');

      const filterValue = btn.getAttribute('data-portfolio-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-portfolio-category');
        
        // Premium filter animation sequence
        if (filterValue === 'all' || itemCategory === filterValue) {
          // Show items
          item.classList.remove('hidden');
          // Trigger browser layout before starting opacity transitions
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide items
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300); // matches transition time
        }
      });
    });
  });
}
