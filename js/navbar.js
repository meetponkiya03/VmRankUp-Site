// Navbar Behavior & Hamburger Menu Drawer

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar background color & shadowing transitions on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('glass-panel', 'shadow-md', 'py-3');
      navbar.classList.remove('bg-transparent', 'py-5');
    } else {
      navbar.classList.remove('glass-panel', 'shadow-md', 'py-3');
      navbar.classList.add('bg-transparent', 'py-5');
    }
    
    updateActiveLink();
  });

  // Mobile Drawer Toggle Control
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        // Close menu
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        // Open menu
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu on link clicks
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlights active nav items
  function updateActiveLink() {
    const currentPath = window.location.pathname;
    let pageMatched = false;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if match is exact or handles sub-details
      const isSubMatch = (href === 'portfolio.html' && currentPath.endsWith('portfolio-details.html')) ||
                         (href === 'blog.html' && currentPath.endsWith('blog-details.html'));

      if (href && (currentPath.endsWith(href) || isSubMatch)) {
        link.classList.add('active');
        pageMatched = true;
      } else {
        link.classList.remove('active');
      }
    });

    // Fallback: If root or index, activate Home link
    if (!pageMatched && (currentPath === '/' || currentPath.endsWith('index.html'))) {
      const homeLink = document.querySelector('.nav-link[href="index.html"]');
      if (homeLink) homeLink.classList.add('active');
    }
  }

  // Initial call to set state
  updateActiveLink();
}
